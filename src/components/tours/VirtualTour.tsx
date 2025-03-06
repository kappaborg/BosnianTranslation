'use client';

import { TourLocation } from '@/data/tourLocations';
import { ArrowsPointingOutIcon, ChevronLeftIcon, ChevronRightIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Props {
  location: TourLocation;
}

export default function VirtualTour({ location }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPanorama, setShowPanorama] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [viewerInstance, setViewerInstance] = useState<any>(null);

  useEffect(() => {
    if (showPanorama && viewerRef.current && !viewerInstance) {
      import('pannellum').then((mod) => {
        const viewer = mod.default.viewer(viewerRef.current!, {
          type: 'equirectangular',
          panorama: location.images.panorama,
          autoLoad: true,
          compass: true,
          hotSpots: [],
          sceneFadeDuration: 1000,
          hfov: 110,
          pitch: 10,
          yaw: 180
        });
        setViewerInstance(viewer);
      });
    }

    return () => {
      if (viewerInstance) {
        viewerInstance.destroy();
        setViewerInstance(null);
      }
    };
  }, [showPanorama, location.images.panorama, viewerInstance]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === location.images.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? location.images.gallery.length - 1 : prev - 1
    );
  };

  return (
    <div className="space-y-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
        {showPanorama ? (
          <div ref={viewerRef} className="absolute inset-0" />
        ) : (
          <div className="relative h-full w-full">
            <Image
              src={location.images.gallery[currentImageIndex]}
              alt={`${location.name} - Fotoğraf ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {location.images.gallery.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentImageIndex === index ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setShowPanorama(!showPanorama)}
          className="flex items-center space-x-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          <ArrowsPointingOutIcon className="h-5 w-5" />
          <span>{showPanorama ? 'Galeriyi Göster' : '360° Görünüm'}</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {location.images.gallery.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentImageIndex(index);
              setShowPanorama(false);
            }}
            className={`relative aspect-square overflow-hidden rounded-lg ${
              currentImageIndex === index ? 'ring-2 ring-indigo-600' : ''
            }`}
          >
            <Image
              src={image}
              alt={`${location.name} - Küçük Resim ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Location Info */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{location.name}</h2>
          <div className="flex items-center text-gray-400">
            <MapPinIcon className="w-5 h-5 mr-2" />
            <span>
              {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
            </span>
          </div>
        </div>

        <p className="text-gray-300">{location.description}</p>

        {/* Historical Information */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Historical Information</h3>
          <p className="text-gray-300">{location.historicalInfo}</p>
        </div>

        {/* Visiting Hours */}
        {location.visitingHours && (
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Visiting Hours</h3>
            <p className="text-gray-300">{location.visitingHours}</p>
          </div>
        )}
      </div>
    </div>
  );
} 