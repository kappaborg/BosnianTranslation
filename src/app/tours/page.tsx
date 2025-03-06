'use client';

import TourMap from '@/components/tours/TourMap';
import VirtualTour from '@/components/tours/VirtualTour';
import { tourLocations } from '@/data/tourLocations';
import { useState } from 'react';

export default function ToursPage() {
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);

  const handleNext = () => {
    if (currentLocationIndex < tourLocations.length - 1) {
      setCurrentLocationIndex(currentLocationIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentLocationIndex > 0) {
      setCurrentLocationIndex(currentLocationIndex - 1);
    }
  };

  const handleLocationSelect = (location: typeof tourLocations[0]) => {
    const index = tourLocations.findIndex((loc) => loc.id === location.id);
    if (index !== -1) {
      setCurrentLocationIndex(index);
    }
  };

  return (
    <main className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
            Virtual Tour of Bosnia
          </h1>
          <p className="text-gray-400 text-lg">
            Explore the most beautiful and historical places in Bosnia and Herzegovina through our immersive virtual tour
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <TourMap
            locations={tourLocations}
            selectedLocation={tourLocations[currentLocationIndex]}
            onLocationSelect={handleLocationSelect}
          />
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Tour Locations</h2>
            <div className="space-y-4">
              {tourLocations.map((location, index) => (
                <button
                  key={location.id}
                  onClick={() => setCurrentLocationIndex(index)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    index === currentLocationIndex
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <h3 className="font-semibold">{location.name}</h3>
                  <p className="text-sm text-gray-400">{location.location}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <VirtualTour
          location={tourLocations[currentLocationIndex]}
          onNext={handleNext}
          onPrevious={handlePrevious}
          totalLocations={tourLocations.length}
          currentIndex={currentLocationIndex}
        />
      </div>
    </main>
  );
} 