'use client';

import { Button } from '../ui/button';
import { useFormStatus } from 'react-dom';
import { IoReload } from 'react-icons/io5';
import { ReloadIcon } from '@radix-ui/react-icons';
import { SignInButton } from '@clerk/nextjs';
import { FaHeart, FaRegEdit, FaRegHeart } from 'react-icons/fa';
import { LuTrash2 } from 'react-icons/lu';
type btnSize = 'default' | 'lg' | 'sm';
type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

type actionType = 'edit' | 'delete';
export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();
  const renderIcon = () => {
    switch (actionType) {
      case 'edit':
        return <FaRegEdit />;
      case 'delete':
        return <LuTrash2 />;
      default:
        const never: never = actionType;
        throw new Error(`Invalid action type: ${actionType}`);
    }
  };

  return (
    <Button
      type='submit'
      size='icon'
      variant='link'
      className='p-2 cursor-pointer'
    >
      {pending ? <ReloadIcon className=' animate-spin' /> : renderIcon()}
    </Button>
  );
};
export const CardSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button
        type='button'
        size='icon'
        variant='outline'
        className='p-2 cursor-pointer'
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      size='icon'
      variant='outline'
      className='p-2 cursor-pointer'
    >
      {pending ? (
        <ReloadIcon className='animate-spin' />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};

export function SubmitButton({
  className = '',
  text = 'submit',
  size = 'lg',
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      size={size}
      disabled={pending}
      type='submit'
      className={`capitalize ${className}`}
    >
      {pending ? (
        <>
          <IoReload>Please wait...</IoReload>
        </>
      ) : (
        text
      )}
    </Button>
  );
}
