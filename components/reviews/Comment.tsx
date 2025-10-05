'use client';
import { useState } from 'react';
import { Button } from '../ui/button';

export default function Comment({ comment }: { comment: string }) {
  const [isExpanded, setIsExpaned] = useState(false);
  const toggleExpaned = () => {
    setIsExpaned(!isExpanded);
  };
  const longComment = comment.length > 100;
  const displayComment =
    longComment && !isExpanded ? `${comment.slice(0, 100)}...` : comment;

  return (
    <div>
      <p className='text-sm'>{displayComment}</p>
      {longComment && (
        <Button
          variant='link'
          className='pl-0 text-muted-foreground'
          onClick={toggleExpaned}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </div>
  );
}
