import TourLocationDetail from '@/components/TourLocationDetail';
import { locations } from '@/data/tourLocations';
import { notFound } from 'next/navigation';

interface TourLocationPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return locations.map((location) => ({
    id: location.id,
  }));
}

export default function TourLocationPage({ params }: TourLocationPageProps) {
  const location = locations.find((loc) => loc.id === params.id);

  if (!location) {
    notFound();
  }

  return <TourLocationDetail location={location} />;
}