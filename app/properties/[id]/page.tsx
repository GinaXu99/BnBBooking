import FavoriteToggleButton from '@/components/card/FavoriteToggleButton';
import PropertyRating from '@/components/card/PropertyRating';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { Skeleton } from '@/components/ui/skeleton';
import BreadCrumbs from '@/components/properties/BreadCrumbs';
import PropertyDetails from '@/components/properties/PropertyDetails';
import ShareButton from '@/components/properties/ShareButton';
import { fetchPropertyDetails, findExistingReview } from '@/utils/actions';
import ImageContainer from '@/components/properties/ImageContainer';
import UserInfo from '@/components/properties/UserInfo';
import Description from '@/components/properties/Description';
import Amenities from '@/components/properties/Amenities';
import dynamic from 'next/dynamic';
import BookingCalendar from '@/components/bookings/BookingCalendar';
import PropertyReviews from '@/components/reviews/PropertyReviews';
import SubmitReview from '@/components/reviews/SubmitReview';
const DynamicMap = dynamic(
  () => import('@/components/properties/PropertyMap'),
  {
    ssr: false,
    loading: () => <Skeleton className='h-[400px] w-full' />,
  }
);

const DynamicBookingWrapper = dynamic(
  () => import('@/components/bookings/BookingWrapper'),
  {
    ssr: false,
    loading: () => <Skeleton className='h-[400px] w-full' />,
  }
);
export default async function Page({ params }: { params: { id: string } }) {
  const property = await fetchPropertyDetails(params.id);
  if (!property) redirect('/');

  const { baths, bedrooms, beds, guests } = property;

  const details = { baths, bedrooms, beds, guests };
  const firstName = property.profile.firstName;
  const profileImage = property.profile.profileImage;

  const { userId } = auth();
  const isNotOwner = property.profile.clerkId !== userId;
  const reviewDoesNotExist =
    userId && !(await findExistingReview(userId, property.id));
  console.log(reviewDoesNotExist);
  //TODO- REVIEW
  return (
    <section>
      <BreadCrumbs name={property.name} />
      <header className='flex justify-between items-center mt-4'>
        <h1 className='text-4xl font-bold capitalize'>{property.tagline}</h1>
        <div className='flex items-center gap-x-4'>
          <ShareButton name={property.name} propertyId={property.id} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>
      <ImageContainer mainImage={property.image} name={property.name} />
      <section className='lg:grid lg:grid-cols-12 gap-x-12 mt-12'>
        <div className='lg:col-span-8'>
          <div className='flex gap-x-4 items-center'>
            <h1>{property.name}</h1>
            <PropertyRating inPage propertyId={property.id} />
          </div>
          <PropertyDetails details={details} />
          <UserInfo profile={{ firstName, profileImage }} />
          <Separator className='mt-4' />
          <Description description={property.description} />
          <Amenities amenities={property.amenities} />
          <DynamicMap countryCode={property.country} />
        </div>
        <div className='lg:col-span-4 flex flex-col items-center'>
          <BookingCalendar />
        </div>
      </section>
      {reviewDoesNotExist && <SubmitReview propertyId={property.id} />}
      <PropertyReviews propertyId={property.id} />
    </section>
  );
}
