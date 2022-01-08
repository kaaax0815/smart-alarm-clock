import { database } from './index';

export interface postSettingsRequest {
  locale?: string;
  timezone?: string;
  location?: {
    city: string;
    countryCode: string;
    lat?: number;
    lon?: number;
  };
}

export interface postSettingsResponse {
  status: string;
  db: database;
}
