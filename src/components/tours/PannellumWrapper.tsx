'use client';

import { TourLocation } from '@/data/tourLocations';
import { useEffect, useRef } from 'react';

interface Props {
  location: TourLocation;
}

export default function PannellumWrapper({ location }: Props) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const pannellumRef = useRef<any>(null);

  useEffect(() => {
    const initPannellum = async () => {
      try {
        // Dynamically import pannellum
        const pannellum = (await import('pannellum')).default;
        
        if (viewerRef.current && !pannellumRef.current) {
          pannellumRef.current = pannellum.viewer(viewerRef.current, {
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
        }
      } catch (error) {
        console.error('Error initializing Pannellum:', error);
      }
    };

    initPannellum();

    return () => {
      if (pannellumRef.current) {
        pannellumRef.current.destroy();
        pannellumRef.current = null;
      }
    };
  }, [location.images.panorama]);

  return (
    <div 
      ref={viewerRef} 
      className="w-full aspect-video rounded-lg overflow-hidden"
    />
  );
} 