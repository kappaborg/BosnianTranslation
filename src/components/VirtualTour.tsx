'use client';

import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Location, locations } from '../data/tourLocations';
import { Button } from './ui/button';
import { LoadingSpinner } from './ui/LoadingSpinner';

const Map = dynamic(
  () => import('./Map'),
  { 
    ssr: false,
    loading: () => <LoadingSpinner />
  }
);

const DEFAULT_IMAGE = '/images/tours/placeholder.jpg';

export default function VirtualTour() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [mapError, setMapError] = useState<Error | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'map'>('list');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleImageError = (locationId: string) => {
    setImageError(prev => ({ ...prev, [locationId]: true }));
  };

  const handleMapError = (error: Error) => {
    console.error('Map error:', error);
    setMapError(error);
    setShowMap(false);
  };

  const toggleFullscreen = () => {
    if (!selectedLocation) return;
    setIsFullscreen(!isFullscreen);
  };

  const renderLocationDetails = (location: Location) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-lg rounded-lg p-6 space-y-4"
    >
      <h3 className="text-2xl font-bold text-white">{location.name}</h3>
      <p className="text-gray-300">{location.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {location.images.map((image, index) => (
          <motion.div
            key={index}
            className={`relative rounded-lg overflow-hidden ${
              isFullscreen ? 'h-screen' : 'h-48 md:h-64'
            }`}
            whileHover={{ scale: 1.02 }}
            onClick={toggleFullscreen}
          >
            <Image
              src={imageError[`${location.id}-${index}`] ? DEFAULT_IMAGE : image}
              alt={`${location.name} - Image ${index + 1}`}
              fill
              className="object-cover"
              onError={() => handleImageError(`${location.id}-${index}`)}
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-6">
        <h4 className="text-xl font-semibold text-white mb-2">Historical Facts</h4>
        <ul className="list-disc list-inside space-y-2">
          {location.historicalFacts.map((fact, index) => (
            <li key={index} className="text-gray-300">{fact}</li>
          ))}
        </ul>
      </div>

      {location.audioGuide && (
        <div className="mt-6">
          <h4 className="text-xl font-semibold text-white mb-2">Audio Guide</h4>
          <audio
            controls
            className="w-full"
            src={location.audioGuide}
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        {/* Mobile Navigation */}
        {isMobile && (
          <div className="flex rounded-lg overflow-hidden">
            <Button
              onClick={() => setActiveTab('list')}
              className={`flex-1 ${activeTab === 'list' ? 'bg-purple-600' : 'bg-gray-700'}`}
            >
              Locations
            </Button>
            <Button
              onClick={() => setActiveTab('map')}
              className={`flex-1 ${activeTab === 'map' ? 'bg-purple-600' : 'bg-gray-700'}`}
            >
              Map View
            </Button>
          </div>
        )}

        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-12'} gap-8`}>
          {/* Locations List */}
          {(!isMobile || activeTab === 'list') && (
            <div className={`${isMobile ? '' : 'col-span-4'} space-y-4`}>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Virtual Tour of Bosnia
              </h2>
              <div className="space-y-4">
                {locations.map((location) => (
                  <motion.div
                    key={location.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedLocation?.id === location.id
                        ? 'bg-purple-600'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedLocation(location)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-semibold text-white">{location.name}</h3>
                    <p className="text-gray-400 mt-2 line-clamp-2">{location.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Map and Location Details */}
          {(!isMobile || activeTab === 'map') && (
            <div className={`${isMobile ? '' : 'col-span-8'} space-y-8`}>
              {/* Map */}
              <div className="h-[400px] rounded-lg overflow-hidden relative">
                {mapError ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                    <p className="text-red-400">Failed to load map. Please try again later.</p>
                  </div>
                ) : (
                  <Map locations={locations} />
                )}
              </div>

              {/* Selected Location Details */}
              <AnimatePresence mode="wait">
                {selectedLocation && renderLocationDetails(selectedLocation)}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 