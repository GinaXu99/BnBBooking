'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import FormContainer from '../form/FormContainer';
import RatingInput from '../form/RatingInput';
import TextAreaInput from '../form/TextAreaInput';
import { Card } from '../ui/card';
import { createReviewAction } from '@/utils/actions';
import { SubmitButton } from '../form/Buttons';

export default function SubmitReview({ propertyId }: { propertyId: string }) {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  return (
    <div className='mt-8'>
      <Button
        onClick={() => {
          setIsReviewFormVisible((pre) => !pre);
        }}
      >
        Leave a Review
      </Button>
      {isReviewFormVisible && (
        <Card className='p-8 mt-8'>
          <FormContainer action={createReviewAction}>
            <input type='hidden' name='propertyId' value={propertyId} />
            <RatingInput name='rating' />
            <TextAreaInput
              name='comment'
              labelText='Feedback'
              defaultValue='amazing place!!'
            />
            <SubmitButton text='submit' className='mt-4' />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}
