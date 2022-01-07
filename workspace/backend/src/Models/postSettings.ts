export interface IPostSettings {
  locale?: string;
  timezone?: string;
  location?: {
    city: string;
    countryCode: string;
    lat?: number;
    lon?: number;
  };
}
