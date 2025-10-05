'use client';

import * as React from 'react';
import { Button } from '../ui/button';
import { LuShare2 } from 'react-icons/lu';

import {
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
} from 'react-share';

export default function ShareButton({
  propertyId,
  name,
}: {
  propertyId: string;
  name: string;
}) {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/properties/${propertyId}`;

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className='relative' ref={dropdownRef}>
      <Button
        variant='outline'
        size='icon'
        className='p-2'
        onClick={() => setOpen(!open)}
      >
        <LuShare2 />
      </Button>

      {open && (
        <div className='absolute bottom-full right-0 mb-2 z-50 rounded-md border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800'>
          <div className='flex items-center gap-2'>
            <TwitterShareButton url={shareLink} title={name} className='cursor-pointer transition-opacity hover:opacity-80'>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={shareLink} title={name} className='cursor-pointer transition-opacity hover:opacity-80'>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <EmailShareButton url={shareLink} subject={name} className='cursor-pointer transition-opacity hover:opacity-80'>
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
        </div>
      )}
    </div>
  );
}
