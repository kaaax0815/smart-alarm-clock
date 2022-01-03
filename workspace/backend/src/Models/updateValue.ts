export interface updateValue {
  type: 'locale' | 'timezone' | 'location';
  value: string | Record<string, string>;
}
