declare module 'pannellum/build/pannellum.js' {
  interface PannellumConfig {
    type: 'equirectangular' | string;
    panorama: string;
    autoLoad?: boolean;
    showZoomCtrl?: boolean;
    compass?: boolean;
    hfov?: number;
    pitch?: number;
    yaw?: number;
    [key: string]: unknown;
  }
  interface PannellumViewer {
    destroy?: () => void;
  }
  const pannellum: {
    viewer: (container: HTMLElement, config: PannellumConfig) => PannellumViewer;
  };
  export = pannellum;
}

declare module 'pannellum/build/pannellum.css' {
  const css: string;
  export default css;
}
