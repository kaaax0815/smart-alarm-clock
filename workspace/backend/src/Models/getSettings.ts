export type getSettingsResponse = {
  timezone: string;
  location: {
    city: string;
    countryCode: string;
    lat: number;
    lon: number;
  };
};
