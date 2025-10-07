'use client';
import { Calendar } from '../ui/calendar';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { DateRange } from 'react-day-picker';
import { useProperty } from '@/utils/store';
import {
  generateDisabledDates,
  defaultSelected,
  generateBlockedPeriods,
  generateDateRange,
} from '@/utils/calendar';

export default function BookingCalendar() {
  const currentDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const bookings = useProperty((state) => state.bookings);
  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  });
  const unavailableDates = generateDisabledDates(blockedPeriods);

  useEffect(() => {
    const selectedRange = generateDateRange(range);
    selectedRange.some((date) => {
      if (unavailableDates[date]) {
        setRange(defaultSelected);
        toast('Booking Calendar Toast', {
          description: 'these dates are booked, please select again',
        });
        return true;
      }
      return false;
    });
    useProperty.setState({ range });
  }, [range, unavailableDates]);
  return (
    <div className='w-full'>
      <Calendar
        id='test'
        mode='range'
        defaultMonth={currentDate}
        selected={range}
        onSelect={setRange}
        className='w-full'
        disabled={blockedPeriods}
      />
    </div>
  );
}
