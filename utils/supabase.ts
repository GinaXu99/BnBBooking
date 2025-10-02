import { createClient } from '@supabase/supabase-js';

const bucket = 'bnbbucket';
const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_KEY as string;

const supabase = createClient(url, key);

export const uploadImage = async (image: File) => {
  console.log('inside image', image);
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: '3600' });

  if (error) throw new Error(`image upload failed with ${error.message}`);

  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
