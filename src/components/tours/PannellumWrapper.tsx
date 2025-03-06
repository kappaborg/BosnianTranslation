'use client';

import 'pannellum/build/pannellum.css';
import { useEffect, useRef } from 'react';

interface PannellumConfig {
  autoLoad?: boolean;
  compass?: boolean;
  hotSpots?: Array<{
    pitch: number;
    yaw: number;
    text: string;
  }>;
  sceneFadeDuration?: number;
  hfov?: number;
  pitch?: number;
  yaw?: number;
}

interface Props {
  imageUrl: string;
  config?: PannellumConfig;
}

export default function PannellumWrapper({ imageUrl, config = {} }: Props) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const pannellumRef = useRef<any>(null);

  useEffect(() => {
    const loadPannellum = async () => {
      try {
        // Dynamically import pannellum
        const pannellum = (await import('pannellum')).default;
        
        if (viewerRef.current && !pannellumRef.current) {
          pannellumRef.current = pannellum.viewer(viewerRef.current, {
            type: 'equirectangular',
            panorama: imageUrl,
            autoLoad: config.autoLoad ?? true,
            compass: config.compass ?? true,
            hotSpots: config.hotSpots ?? [],
            sceneFadeDuration: config.sceneFadeDuration ?? 1000,
            hfov: config.hfov ?? 110,
            pitch: config.pitch ?? 10,
            yaw: config.yaw ?? 180,
            autoRotate: -2,
            showControls: true,
            showFullscreenCtrl: true,
            showZoomCtrl: true,
            mouseZoom: true,
            draggable: true,
          });
        }
      } catch (error) {
        console.error('Error loading Pannellum:', error);
      }
    };

    loadPannellum();

    return () => {
      if (pannellumRef.current) {
        pannellumRef.current.destroy();
      }
    };
  }, [imageUrl, config]);

  return (
    <div
      ref={viewerRef}
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    />
  );
} 