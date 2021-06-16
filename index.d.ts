import { Component, FC, ReactElement, ReactNode } from "react";

type BreakpointNames = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type InitialBreakpoints = BreakpointNames | '_initial'

type MediaQueries = {
  [mq in InitialBreakpoints]?: string
}

type MediaTypeMapping = boolean

type IsCalculated = boolean

type MediaTypeMap = {
  [mt in InitialBreakpoints]?: MediaTypeMapping
}

type Orientation = 'portrait' | 'landscape' | null

interface ResponsiveContext {
  isCalculated: IsCalculated,
  mediaType: InitialBreakpoints,
  lessThan: MediaTypeMap,
  greaterThan: MediaTypeMap,
  is: MediaTypeMap,
  orientation: Orientation,
}

interface IsMobile {
  isCalculated: IsCalculated,
  isMobile: MediaTypeMapping,
}

type Breakpoints = {
  [bp in BreakpointNames]?: string
}

interface ResponsiveProps {
  children: ReactNode,
}

interface ResponsiveProviderProps {
  initialMediaType?: InitialBreakpoints,
  defaultOrientation?: Orientation,
  children: ReactNode,
  breakpoints?: Breakpoints,
  breakpointsMax?: Breakpoints,
  mediaQueries?: MediaQueries,
  mobileBreakpoint?: BreakpointNames,
}

interface WithResponsiveProps {
  responsive: ResponsiveContext
}

export const ResponsiveProvider: FC<ResponsiveProviderProps>

export const useResponsive: () => ResponsiveContext

export const Responsive: FC<ResponsiveProps>

export const withResponsive: <P = {}>(Component: Component) =>
  (props: P) => ReactElement<P & WithResponsiveProps>

export const withIsMobile: <P = {}>(Component: Component) =>
  (props: P) => ReactElement<P & IsMobile>

export const useIsMobile: () => IsMobile
