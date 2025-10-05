'use client';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { Button } from '../ui/button';
import FormContainer from '../form/FormContainer';
import { SubmitButton } from '../form/Buttons';
import { useProperty } from '@/utils/store';
import { createBookingAction } from '@/utils/actions';

export default function ConfirmBooking() {
  const { propertyId, range } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

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

  const createBooking = createBookingAction.bind(null, {
    propertyId,
    checkIn,
    checkOut,
  });

  return (
    <section>
      <FormContainer action={createBooking}>
        <SubmitButton text='Reserve' className='w-full' />
      </FormContainer>
    </section>
  );
}
