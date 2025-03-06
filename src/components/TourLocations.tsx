import { tourLocations } from '@/data/tourLocations';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TourLocations: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Explore Bosnia & Herzegovina</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tourLocations.map((location) => (
          <Link 
            href={`/tours/${location.id}`} 
            key={location.id}
            className="group bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <div className="relative h-64">
              <Image
                src={location.images.gallery[0]}
                alt={location.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-opacity" />
              <h3 className="absolute bottom-4 left-4 text-white text-2xl font-semibold drop-shadow-lg">
                {location.name}
              </h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600 line-clamp-3">{location.description}</p>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <svg 
                  className="h-5 w-5 mr-2" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  {location.coordinates.lat.toFixed(3)}, {location.coordinates.lng.toFixed(3)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TourLocations; 