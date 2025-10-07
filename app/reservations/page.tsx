import { fetchReservations } from '@/utils/actions';
import Link from 'next/link';
import EmptyList from '@/components/home/EmptyList';
import CountryFlagAndName from '@/components/card/CountryFlagAndName';

import { formatCurrency, formatDate } from '@/utils/format';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Stats from '@/components/reservations/Stats';

export default async function ReservationsPage() {
  const reservations = await fetchReservations();
  if (reservations.length === 0) return <EmptyList />;

  return (
    <>
      <Stats />
      <div className='mt-16'>
        <h4 className='mb-4 capitalize'>
          Total reservations: {reservations.length}
        </h4>
        <Table>
          <TableCaption>Reservation Lists</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Nights</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((item) => {
              const { id, orderTotal, totalNights, checkIn, checkOut } = item;
              const { id: propertyId, name, country } = item.property;
              const startDate = formatDate(checkIn);
              const endDate = formatDate(checkOut);

              return (
                <TableRow key={id}>
                  <TableCell>
                    <Link href={`/properties/${propertyId}`}>{name}</Link>
                  </TableCell>
                  <TableCell>
                    <CountryFlagAndName countryCode={country} />
                  </TableCell>
                  <TableCell>{totalNights}</TableCell>
                  <TableCell>{formatCurrency(orderTotal)}</TableCell>
                  <TableCell>{startDate}</TableCell>
                  <TableCell>{endDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
