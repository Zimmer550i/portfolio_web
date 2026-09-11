/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean | string;
        'camera-controls'?: boolean | string;
        ar?: boolean | string;
        poster?: string;
        shadow_intensity?: string;
        exposure?: string;
        loading?: 'auto' | 'lazy' | 'eager';
      },
      HTMLElement
    >;
  }
}
