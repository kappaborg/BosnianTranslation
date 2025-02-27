declare module 'react-pannellum' {
  interface Hotspot {
    pitch: number;
    yaw: number;
    text: string;
    type: string;
  }

  interface PannellumProps {
    width: string;
    height: string;
    image: string;
    pitch?: number;
    yaw?: number;
    hfov?: number;
    autoLoad?: boolean;
    onLoad?: () => void;
    hotspots?: Hotspot[];
  }

  const ReactPannellum: React.FC<PannellumProps>;
  export default ReactPannellum;
} 