import { Card, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { formatCurrency } from '@/utils/format';

export default function BookingForm() {
  return (
    <Card className='p-8 mb-4'>
      <CardTitle className='mb-8'>Bookingform summary </CardTitle>
      {/* <FormRow label={`$${price} x ${totalNights} nights`} amount={subTotal} />
      <FormRow label='Cleaning Fee' amount={cleaning} />
      <FormRow label='Service Fee' amount={service} />
      <FormRow label='Tax' amount={tax} /> */}
      <Separator className='mt-4' />
      <CardTitle className='mt-8'>
        {/* <FormRow label='Booking Total' amount={orderTotal} /> */}
      </CardTitle>
    </Card>
  );
}
