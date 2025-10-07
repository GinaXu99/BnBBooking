import EmptyList from '@/components/home/EmptyList';
import { fetchRentals, deleteRentalAction } from '@/utils/actions';
import Link from 'next/link';
import { formatCurrency } from '@/utils/format';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import FormContainer from '@/components/form/FormContainer';
import { IconButton } from '@/components/form/Buttons';
export default async function RentalsPage() {
  const rentals = await fetchRentals();

  if (rentals.length === 0)
    return (
      <EmptyList
        heading='No Rentals found'
        message='Start Renting with us Today'
      />
    );
  return (
    <div className='mt-16'>
      <h4>Active Properties</h4>
      <Table>
        <TableCaption>Your Property Lists</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Nightly Rate</TableHead>
            <TableHead>Nights Booked</TableHead>
            <TableHead>Total Income</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentals.map((rental) => {
            const { id: propertyId, name, price } = rental;
            const { totalNightsSum, orderTotalSum } = rental;
            return (
              <TableRow key={propertyId}>
                <TableCell>
                  <Link href={`/properties/${propertyId}`}>{name}</Link>
                </TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell>{totalNightsSum || 0}</TableCell>
                <TableCell>{formatCurrency(orderTotalSum)}</TableCell>
                <TableCell className='flex items-center gap-x-2'>
                  <Link href={`/rentals/${propertyId}/edit`}>
                    <IconButton actionType='edit'></IconButton>
                  </Link>
                  <DeleteRental propertyId={propertyId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

const DeleteRental = ({ propertyId }: { propertyId: string }) => {
  const deleteRental = deleteRentalAction.bind(null, { propertyId });
  return (
    <FormContainer action={deleteRental}>
      <IconButton actionType='delete' />
    </FormContainer>
  );
};
