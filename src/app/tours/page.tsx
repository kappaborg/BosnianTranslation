'use client';

import Map from '@/components/Map';
import { locations } from '@/data/tourLocations';
import { Location } from '@/types';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const TourLocationDetail = dynamic(() => import('@/components/TourLocationDetail'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  ),
});

export default function ToursPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  return (
    <div className="min-h-screen pt-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Virtual Tour of Bosnia & Herzegovina</h1>
        
        <div className="grid grid-cols-1 gap-8">
          <Map
            locations={locations}
            onLocationSelect={(location) => setSelectedLocation(location)}
          />
          
          {selectedLocation && <TourLocationDetail location={selectedLocation} />}
          
          {!selectedLocation && (
            <div className="text-center py-8">
              <p className="text-gray-600">
                Select a location on the map to view detailed information.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 