import { Location, locations } from '@/data/tourLocations';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, Volume2, VolumeX, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Pannellum } from 'react-pannellum';
import LoadingSpinner from './ui/LoadingSpinner';
import { Button } from './ui/button';

interface Hotspot {
  pitch: number;
  yaw: number;
  text: string;
}

export default function VirtualTour() {
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showPanorama, setShowPanorama] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchWeatherData();
  }, [selectedLocation]);

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

  const handleAudioToggle = () => {
    const audio = document.getElementById('audioGuide') as HTMLAudioElement;
    if (audio) {
      if (isAudioPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedLocation.images.length - 1 : prev - 1));
    } else {
      setCurrentImageIndex((prev) => (prev === selectedLocation.images.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Location Selection */}
          <div className="md:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Virtual Tour Locations</h2>
            <div className="space-y-2">
              {locations.map((location: Location) => (
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
              {selectedLocation.panorama && (
                <Button
                  onClick={() => setShowPanorama(true)}
                  className="flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  View 360° Panorama
                </Button>
              )}
              
              {selectedLocation.audioGuide && (
                <Button
                  onClick={handleAudioToggle}
                  className="flex items-center gap-2"
                >
                  {isAudioPlaying ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                  {isAudioPlaying ? 'Pause Audio Guide' : 'Play Audio Guide'}
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
              <ul className="list-disc list-inside space-y-2">
                {selectedLocation.historicalFacts.map((fact: string, index: number) => (
                  <li key={index} className="text-gray-600">{fact}</li>
                ))}
              </ul>
            </div>

            {/* Audio Guide */}
            {selectedLocation.audioGuide && (
              <audio
                id="audioGuide"
                src={selectedLocation.audioGuide}
                onEnded={() => setIsAudioPlaying(false)}
                className="hidden"
              />
            )}
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
                src={selectedLocation.images[currentImageIndex]}
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
                {currentImageIndex + 1} / {selectedLocation.images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panorama Modal */}
      <AnimatePresence>
        {showPanorama && selectedLocation.panorama && (
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
              <Pannellum
                width="100%"
                height="100%"
                image={selectedLocation.panorama.url}
                pitch={10}
                yaw={180}
                hfov={110}
                autoLoad
                onLoad={() => setIsLoading(false)}
                hotspots={selectedLocation.panorama.hotspots?.map((hotspot: Hotspot) => ({
                  pitch: hotspot.pitch,
                  yaw: hotspot.yaw,
                  text: hotspot.text,
                  type: 'info'
                }))}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Spinner */}
      {isLoading && <LoadingSpinner />}
    </div>
  );
} 