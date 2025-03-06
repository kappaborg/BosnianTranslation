'use client';

import { TourLocation, tourLocations } from '@/data/tourLocations';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from './ui/LoadingSpinner';
import { Button } from './ui/button';

const VirtualTour = () => {
  const [selectedLocation, setSelectedLocation] = useState<TourLocation>(tourLocations[0]);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPanorama, setShowPanorama] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchWeatherData();
    }
  }, [selectedLocation, mounted]);

  useEffect(() => {
    if (showPanorama && viewerRef.current) {
      import('pannellum').then((mod) => {
        const viewer = mod.default.viewer(viewerRef.current!, {
          type: 'equirectangular',
          panorama: selectedLocation.images.panorama,
          autoLoad: true,
          compass: true,
          orientationOnByDefault: true,
        });
        setViewer(viewer);
      });
    }
    return () => {
      if (viewer) {
        viewer.destroy();
      }
    };
  }, [showPanorama, selectedLocation.images.panorama]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${selectedLocation.coordinates.lat}&lon=${selectedLocation.coordinates.lng}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedLocation.images.gallery.length - 1 : prev - 1));
    } else {
      setCurrentImageIndex((prev) => (prev === selectedLocation.images.gallery.length - 1 ? 0 : prev + 1));
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Location Selection */}
          <div className="md:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Virtual Tour Locations</h2>
            <div className="space-y-2">
              {tourLocations.map((location: TourLocation) => (
                <motion.button
                  key={location.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedLocation(location)}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    selectedLocation.id === location.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white hover:bg-blue-50'
                  }`}
                >
                  <h3 className="font-semibold">{location.name}</h3>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Location Details */}
          <div className="md:col-span-2 bg-white rounded-lg p-6 shadow-lg">
            <h1 className="text-3xl font-bold mb-4">{selectedLocation.name}</h1>
            
            {/* Weather Information */}
            {weatherData && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm">Current Weather: {weatherData.weather[0].main}</p>
                <p className="text-sm">Temperature: {Math.round(weatherData.main.temp)}°C</p>
              </div>
            )}

            <p className="text-gray-600 mb-6">{selectedLocation.description}</p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              {selectedLocation.images.panorama && (
                <Button
                  onClick={() => setShowPanorama(true)}
                  className="flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  View 360° Panorama
                </Button>
              )}
              
              <Button
                onClick={() => setShowGallery(true)}
                className="flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                View Gallery
              </Button>
            </div>

            {/* Historical Facts */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Historical Facts</h3>
              <p className="text-gray-600">{selectedLocation.historicalInfo}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <button
                onClick={() => setShowGallery(false)}
                className="absolute top-4 right-4 text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => handleImageNavigation('prev')}
                className="absolute left-4 text-white"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <img
                src={selectedLocation.images.gallery[currentImageIndex]}
                alt={`${selectedLocation.name} - Image ${currentImageIndex + 1}`}
                className="max-h-[80vh] max-w-[90vw] object-contain"
              />
              
              <button
                onClick={() => handleImageNavigation('next')}
                className="absolute right-4 text-white"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
              
              <div className="absolute bottom-4 text-white text-sm">
                {currentImageIndex + 1} / {selectedLocation.images.gallery.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panorama Modal */}
      <AnimatePresence>
        {showPanorama && selectedLocation.images.panorama && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          >
            <button
              onClick={() => setShowPanorama(false)}
              className="absolute top-4 right-4 text-white z-50"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="w-full h-full max-w-7xl mx-auto p-4">
              <div ref={viewerRef} className="w-full h-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default dynamic(() => Promise.resolve(VirtualTour), {
  ssr: false
}); 