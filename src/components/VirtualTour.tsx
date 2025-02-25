import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
import { Location, locations } from '../data/tourLocations';
import { Button } from './ui/button';

const Map = dynamic(
  () => import('./Map'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-900/50">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin" />
      </div>
    )
  }
);

const DEFAULT_IMAGE = '/images/tours/placeholder.jpg';

export default function VirtualTour() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [mapError, setMapError] = useState<Error | null>(null);

  const handleImageError = (locationId: string) => {
    setImageError(prev => ({ ...prev, [locationId]: true }));
  };

  const handleMapError = (error: Error) => {
    console.error('Map error:', error);
    setMapError(error);
    setShowMap(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Virtual Tour of Bosnia
        </h2>
        <Button
          onClick={() => setShowMap(!showMap)}
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white"
          disabled={!!mapError}
        >
          {showMap ? 'Show Locations' : 'Show Map'}
        </Button>
      </div>

      {mapError && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
          <p>Failed to load map. Please try again later.</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {showMap ? (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[600px] rounded-lg overflow-hidden shadow-lg"
          >
            <Map locations={locations} />
          </motion.div>
        ) : (
          <motion.div
            key="locations"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {locations.map((location) => (
              <motion.div
                key={location.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                onClick={() => setSelectedLocation(location)}
              >
                <div className="relative h-48">
                  <Image
                    src={imageError[location.id] ? DEFAULT_IMAGE : location.images[0]}
                    alt={location.name}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(location.id)}
                    priority={true}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{location.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {location.description.slice(0, 150)}...
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedLocation(null)}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64">
              <Image
                src={imageError[selectedLocation.id] ? DEFAULT_IMAGE : selectedLocation.images[0]}
                alt={selectedLocation.name}
                fill
                className="object-cover"
                onError={() => handleImageError(selectedLocation.id)}
                priority={true}
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedLocation.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {selectedLocation.description}
              </p>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Historical Facts</h3>
                <ul className="list-disc list-inside space-y-2">
                  {selectedLocation.historicalFacts.map((fact, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300">
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
              {selectedLocation.audioGuide && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Audio Guide</h3>
                  <audio controls className="w-full">
                    <source src={selectedLocation.audioGuide} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
              <Button
                onClick={() => setSelectedLocation(null)}
                className="mt-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 