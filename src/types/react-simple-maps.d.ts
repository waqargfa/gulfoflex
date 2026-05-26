declare module "react-simple-maps" {
  export interface Geography {
    rsmKey: string;
    id?: string | number;
    properties: Record<string, unknown>;
    type: string;
    geometry: Record<string, unknown>;
  }

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
  }

  export interface GeographiesProps {
    geography: string | Record<string, unknown>;
    children: (props: { geographies: Geography[] }) => React.ReactNode;
  }

  export interface GeographyProps extends React.SVGAttributes<SVGPathElement> {
    geography: Geography;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
  }

  export interface MarkerProps {
    coordinates: [number, number];
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }

  export interface LineProps extends React.SVGAttributes<SVGPathElement> {
    from?: [number, number];
    to?: [number, number];
    coordinates?: [number, number][];
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
    strokeDasharray?: string;
  }

  export interface SphereProps extends React.SVGAttributes<SVGPathElement> {
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
  }

  export interface GraticuleProps extends React.SVGAttributes<SVGPathElement> {
    stroke?: string;
    strokeWidth?: number;
  }

  export interface ZoomableGroupProps {
    zoom?: number;
    center?: [number, number];
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
  }

  export const ComposableMap: React.ComponentType<ComposableMapProps>;
  export const Geographies: React.ComponentType<GeographiesProps>;
  export const Geography: React.ComponentType<GeographyProps>;
  export const Marker: React.ComponentType<MarkerProps>;
  export const Line: React.ComponentType<LineProps>;
  export const Sphere: React.ComponentType<SphereProps>;
  export const Graticule: React.ComponentType<GraticuleProps>;
  export const ZoomableGroup: React.ComponentType<ZoomableGroupProps>;
  export const Annotation: React.ComponentType<Record<string, unknown>>;
  export const MapContext: React.Context<unknown>;
  export const MapProvider: React.ComponentType<{ children: React.ReactNode }>;
  export const ZoomPanContext: React.Context<unknown>;
  export const ZoomPanProvider: React.ComponentType<{ children: React.ReactNode }>;
  export function useGeographies(props: { geography: string | Record<string, unknown> }): { geographies: Geography[] };
  export function useMapContext(): unknown;
  export function useZoomPan(): unknown;
  export function useZoomPanContext(): unknown;
}
