'use client';

import { Location } from '@/types';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import ReactPannellum to avoid SSR issues
const ReactPannellum = dynamic(() => import('react-pannellum'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading panorama viewer...</p>
    </div>
  ),
});

interface PanoramaViewerProps {
  location: Location;
}

export default function PanoramaViewer({ location }: PanoramaViewerProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  if (!location.panorama) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No panorama available for this location</p>
      </div>
    );
  }

  const config = {
    autoLoad: true,
    compass: true,
    showZoomCtrl: true,
    showFullscreenCtrl: true,
    hotSpots: location.panorama.hotspots?.map((hotspot) => ({
      type: 'info',
      cssClass: 'custom-hotspot',
      pitch: hotspot.pitch,
      yaw: hotspot.yaw,
      text: hotspot.text,
      handleClick: () => setActiveHotspot(hotspot.text),
    })),
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
        <ReactPannellum
          width="100%"
          height="100%"
          image={location.panorama.url}
          pitch={0}
          yaw={0}
          hfov={110}
          autoLoad
          onLoad={() => {
            console.log('Panorama loaded');
          }}
          config={config}
        />
      </div>

      {activeHotspot && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-4 bg-white rounded-lg shadow-md"
        >
          <div className="flex justify-between items-start">
            <p className="text-gray-700">{activeHotspot}</p>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5"
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

      <style jsx global>{`
        .custom-hotspot {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          transition: transform 0.2s;
        }
        .custom-hotspot:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.9);
        }
      `}</style>
    </div>
  );
} 