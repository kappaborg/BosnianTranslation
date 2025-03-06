'use client';

import { TourLocation } from '@/data/tourLocations';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import react-leaflet components
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface MapProps {
  locations: TourLocation[];
  onLocationSelect?: (location: TourLocation) => void;
}

const Map = ({ locations, onLocationSelect }: MapProps) => {
  const [mounted, setMounted] = useState(false);
  const [mapIcon, setMapIcon] = useState<any>(null);

  useEffect(() => {
    // Import Leaflet only on client side
    import('leaflet').then((L) => {
      // Initialize Leaflet icon
      const icon = L.default.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      setMapIcon(icon);
    });

    // Import Leaflet CSS
    import('leaflet/dist/leaflet.css');
    
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  const center = {
    lat: 43.915886,
    lng: 17.679076
  };

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapIcon && locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={mapIcon}
            eventHandlers={{
              click: () => onLocationSelect?.(location)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-lg">{location.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{location.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Export with dynamic to ensure no SSR
export default dynamic(() => Promise.resolve(Map), {
  ssr: false
});

