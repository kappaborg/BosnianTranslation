declare module 'pannellum' {
  interface PannellumViewer {
    destroy(): void;
  }

  interface PannellumStatic {
    viewer(container: HTMLElement, config: any): PannellumViewer;
  }

  const pannellum: PannellumStatic;
  export default pannellum;
} 