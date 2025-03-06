'use client';

import { TourLocation } from '@/data/tourLocations';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import Leaflet with no SSR
const Map = dynamic(
  () => import('react-leaflet').then((mod) => ({ default: mod.MapContainer })),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => ({ default: mod.TileLayer })),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => ({ default: mod.Marker })),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => ({ default: mod.Popup })),
  { ssr: false }
);

interface Props {
  locations: TourLocation[];
  selectedLocation?: TourLocation;
  onLocationSelect: (location: TourLocation) => void;
}

export default function TourMap({ locations, selectedLocation, onLocationSelect }: Props) {
  const [mounted, setMounted] = useState(false);
  const [icons, setIcons] = useState<Record<TourLocation['locationType'], any>>({});

  useEffect(() => {
    const initializeLeaflet = async () => {
      try {
        // Import Leaflet and its CSS
        const L = (await import('leaflet')).default;
        await import('leaflet/dist/leaflet.css');
        
        setMounted(true);

        // Create icons for each location type after component mounts
        const createCustomIcon = (type: TourLocation['locationType']) => {
          const getIconColor = (type: TourLocation['locationType']) => {
            switch (type) {
              case 'bridge':
                return '#4F46E5';
              case 'bazaar':
                return '#DC2626';
              case 'spring':
                return '#059669';
              case 'fortress':
                return '#9333EA';
              case 'waterfall':
                return '#2563EB';
              case 'monastery':
                return '#D97706';
              default:
                return '#6B7280';
            }
          };

          const color = getIconColor(type);
          const size = 32;
          
          return L.divIcon({
            html: `<div class="custom-icon-wrapper" style="color: ${color}">
              <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${getIconPath(type)}
              </svg>
            </div>`,
            className: 'custom-icon',
            iconSize: [size, size],
            iconAnchor: [size/2, size],
            popupAnchor: [0, -size]
          });
        };

        const iconTypes: TourLocation['locationType'][] = [
          'bridge', 'bazaar', 'spring', 'fortress', 'waterfall', 'monastery'
        ];
        
        const newIcons = iconTypes.reduce((acc, type) => ({
          ...acc,
          [type]: createCustomIcon(type)
        }), {});

        setIcons(newIcons);
      } catch (error) {
        console.error('Error initializing Leaflet:', error);
      }
    };

    initializeLeaflet();
  }, []);

  const getIconPath = (type: TourLocation['locationType']) => {
    switch (type) {
      case 'bridge':
        return '<path d="M4 10h16M4 14h16M6 10v4M10 10v4M14 10v4M18 10v4M4 10c0-2.21 3.582-4 8-4s8 1.79 8 4" />';
      case 'bazaar':
        return '<path d="M4 7h16M4 17h16M6 7v10M18 7v10M10 7v10M14 7v10M4 12h16" />';
      case 'spring':
        return '<path d="M12 3c-1.5 1.5-4 3-4 6 0 3 4 12 4 12s4-9 4-12c0-3-2.5-4.5-4-6z" /><path d="M12 9c-.5.5-2 1.5-2 3s2 6 2 6" />';
      case 'fortress':
        return '<path d="M4 21h16M6 21V11l-2-2V7l4-4 4 4v2l-2 2v10M18 21V11l2-2V7l-4-4-4 4" /><path d="M12 21v-6" />';
      case 'waterfall':
        return '<path d="M12 3v3M12 9c0 3-4 6-4 9h8c0-3-4-6-4-9z" /><path d="M10 18c0 2 4 2 4 0" />';
      case 'monastery':
        return '<path d="M12 3L4 9v12h16V9l-8-6z" /><path d="M8 21v-6a4 4 0 018 0v6" /><path d="M12 9v3" />';
      default:
        return '<circle cx="12" cy="12" r="10" />';
    }
  };

  if (!mounted) return null;

  const center = selectedLocation
    ? [selectedLocation.coordinates.lat, selectedLocation.coordinates.lng]
    : [43.9159, 17.6791];

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <Map
        center={center as [number, number]}
        zoom={selectedLocation ? 13 : 7}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={icons[location.locationType]}
            eventHandlers={{
              click: () => onLocationSelect(location),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{location.name}</h3>
                <p className="text-sm text-gray-600">{location.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </Map>
    </div>
  );
} 