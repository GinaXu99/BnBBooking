'use client';
import { Calendar } from '../ui/calendar';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { DateRange } from 'react-day-picker';

import {
  generateDisabledDates,
  defaultSelected,
  generateBlockedPeriods,
  generateDateRange,
} from '@/utils/calendar';

export default function BookingCalendar() {
  const currentDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  return (
    <div className='w-full'>
      <Calendar
        id='test'
        mode='range'
        defaultMonth={currentDate}
        selected={range}
        onSelect={setRange}
        className='w-full'
      />
    </div>
  );
}
