export interface updateValue {
  type: 'locale' | 'timezone';
  value: string;
}

export type getValue = Omit<updateValue, 'value'>;
