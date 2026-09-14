export * from "./inquiry";

export interface NavLinkItem {
  label: string;
  href: string;
  category?: string;
}

export interface NavColumn {
  title: string;
  links: NavLinkItem[];
}

export interface TelemetryStatItem {
  index: string;
  value: string;
  unit: string;
  category: string;
  label: string;
  description: string;
  metricHighlight: string;
}
