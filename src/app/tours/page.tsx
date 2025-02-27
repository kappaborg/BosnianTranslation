'use client';

import Map from '@/components/Map';
import TourLocations from '@/components/TourLocations';
import { locations } from '@/data/tourLocations';
import { Location } from '@/types';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ToursPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Virtual Tours</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the rich cultural heritage and stunning landmarks of Bosnia and Herzegovina through our interactive virtual tours.
          </p>
        </div>

        <div className="mb-12">
          <Map 
            locations={locations} 
            onLocationSelect={(location) => setSelectedLocation(location)}
          />
        </div>

        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-12 p-6 bg-white rounded-lg shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedLocation.name}</h2>
                <p className="text-gray-600">{selectedLocation.description}</p>
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}

        <TourLocations />
      </motion.div>
    </div>
  );
} 