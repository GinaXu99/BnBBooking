import { fetchProperties } from '@/utils/actions';
import PropertiesList from './PropertiesList';
import { PropertyCardProps } from '@/utils/types';
import EmptyList from './EmptyList';
export default async function PropertiesContainer({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const properties: PropertyCardProps[] = await fetchProperties({
    category,
    search,
  });

  if (properties.length === 0) {
    return (
      <EmptyList
        heading='No results'
        message='Try changing or removing some of your filters'
        btnText='Clear Filters'
      />
    );
  }

  return <PropertiesList properties={properties} />;
}
