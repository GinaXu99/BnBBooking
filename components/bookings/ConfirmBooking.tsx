'use client';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { Button } from '../ui/button';
import FormContainer from '../form/FormContainer';
import { SubmitButton } from '../form/Buttons';

export default function ConfirmBooking() {
  const { userId } = useAuth();
  if (!userId) {
    return (
      <SignInButton mode='modal'>
        <Button type='button' className='w-full'>
          Sign In to Complete Booking
        </Button>
      </SignInButton>
    );
  }
  return (
    <section>
      ConfirmBooking form
      {/* <FormContainer action={}>
        <SubmitButton text='Reserve' className='w-full' />
      </FormContainer> */}
    </section>
  );
}
