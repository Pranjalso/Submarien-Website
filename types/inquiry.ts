export type InquiryDomainCategory =
  | "Defense"
  | "Surveillance"
  | "Sensing"
  | "Water Quality"
  | "Serve"
  | "Flagship Architecture & Subsystems"
  | "Arrays & Acoustic Sensors"
  | "Subsea Operational Telemetry & Architecture"
  | "Mission Operations & Fleet Deployment"
  | "Custom Tactical Configuration"
  | string;

export interface InquiryRequestBody {
  fullName: string;
  email: string;
  organization: string;
  category: InquiryDomainCategory;
  missionScope: string;
}

export interface InquiryConfirmation {
  inquiryId: string;
  timestamp: string;
  category: string;
  status: "RECEIVED" | "PROCESSING" | "DISPATCHED";
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
