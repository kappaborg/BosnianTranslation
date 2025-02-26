declare module 'react-pannellum' {
  interface PannellumProps {
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

  const ReactPannellum: React.FC<PannellumProps>;
  export default ReactPannellum;
} 