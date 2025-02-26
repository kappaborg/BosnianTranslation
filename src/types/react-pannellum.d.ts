declare module 'react-pannellum' {
  export interface PannellumProps {
    width: string;
    height: string;
    image: string;
    pitch?: number;
    yaw?: number;
    hfov?: number;
    autoLoad?: boolean;
    onLoad?: () => void;
    hotspots?: Array<{
      pitch: number;
      yaw: number;
      text: string;
      type: string;
    }>;
  }

  export const Pannellum: React.FC<PannellumProps>;
} 