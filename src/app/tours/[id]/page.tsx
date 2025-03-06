import TourLocationDetail from '@/components/TourLocationDetail';
import { tourLocations } from '@/data/tourLocations';
import { notFound } from 'next/navigation';

interface TourLocationPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return tourLocations.map((location) => ({
    id: location.id,
  }));
}

export default function TourLocationPage({ params }: TourLocationPageProps) {
  const location = tourLocations.find((loc) => loc.id === params.id);

  if (!location) {
    notFound();
  }

  return <TourLocationDetail location={location} />;
}