import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Location } from '../data/tourLocations';

// Fix for default marker icons in Next.js
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapProps {
  locations: Location[];
}

export default function Map({ locations }: MapProps) {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      setError(new Error('Map cannot be rendered on the server'));
      return;
    }

    // Check if Leaflet is available
    if (!L) {
      setError(new Error('Leaflet library failed to load'));
      return;
    }
  }, []);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-500/10">
        <div className="text-center text-red-500">
          <p>Failed to load map</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={[43.8563, 18.4131]}
      zoom={7}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.coordinates.lat, location.coordinates.lng]}
          icon={icon}
        >
          <Popup>
            <h3 className="font-bold">{location.name}</h3>
            <p className="text-sm">{location.description.slice(0, 100)}...</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 