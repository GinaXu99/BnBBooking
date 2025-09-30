'use server';

import db from './db';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { imageSchema, profileSchema, validateWithZodSchema } from './schema';
import { redirect } from 'next/navigation';
import { uploadImage } from './supabase';

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : 'Error occured',
  };
};

/**USER PART */
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error('You must be logged in to access this route!');
  }

  if (!user.privateMetadata.hasProfile) redirect('/');
  return user;
};

/**PROFILE PART */
export const fetchProfile = async () => {
  const user = getAuthUser();

  const profile = await db.profile.findUnique({
    where: {
      clerkId: (await user).id,
    },
  });

  if (!profile) return redirect('/profile/create');
  return profile;
};

export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });

  return profile?.profileImage;
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields,
    });
    revalidatePath('/profile');
    return { message: 'profile udpated successfully' };
  } catch (error) {
    return renderError(error);
  }
};
export const createProfileAction = async (
  preveState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await currentUser();
    if (!user) throw new Error('Please login to create a profile');

    const rawData = Object.fromEntries(formData);
    const validateFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validateFields,
      },
    });

    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
};

export const updateProfileImageAction = async (
  preveState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const image = formData.get('image') as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFields.image);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath,
      },
    });

    revalidatePath('/profile');
    return { message: 'profile image updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};
