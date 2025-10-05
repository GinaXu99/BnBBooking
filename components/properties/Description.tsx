'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import Title from './Title';

export default function Description({ description }: { description: string }) {
  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);
  const words = description.split(' ');
  const isLongDescription = words.length > 100;

  const toggleDescription = () => {
    setIsFullDescriptionShown(!isFullDescriptionShown);
  };

  const displayDescription =
    isLongDescription && !isFullDescriptionShown
      ? words.splice(0, 100).join(' ') + '...'
      : description;
  return (
    <article className='mt-4'>
      <Title text='Description' />
      <p className='text-muted-foreground leading-loose'>
        {displayDescription}
      </p>
      {isLongDescription && (
        <Button
          variant='link'
          className='pl-0 font-semibold'
          onClick={toggleDescription}
        >
          {isFullDescriptionShown ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </article>
  );
}
