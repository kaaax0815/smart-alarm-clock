import { database } from '../index';

export interface postSettingsRequest {
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
