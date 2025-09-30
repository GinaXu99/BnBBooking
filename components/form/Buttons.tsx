'use client';

import { Button } from '../ui/button';
import { useFormStatus } from 'react-dom';
import { IoReload } from 'react-icons/io5';

type btnSize = 'default' | 'lg' | 'sm';
type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
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
