import { fetchProfileImage } from '@/utils/actions';
import { LucideUser2 } from 'lucide-react';

export default async function UserIcon() {
  const profileImage = await fetchProfileImage();
  if (profileImage) {
    return (
      <img src={profileImage} className='w-6 h-6 rounded-full object-cover' />
    );
  }
  return <LucideUser2 className='w-8 h-8 rounded-full' />;
}
