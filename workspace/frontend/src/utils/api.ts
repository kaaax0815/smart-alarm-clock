/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Models from 'backend';
export * as Models from 'backend';

export async function getSettings() {
  const result = await getAPI(GetEndpoints.Settings);
  return result.settings;
}

export type GetSettingsData = AsyncReturnType<typeof getSettings>;

export async function getAPI<T extends GetEndpoints>(endpoint: T, params?: GetParams<T>) {
  const url = buildURL(endpoint);
  const query = params ? `?${encodeQueryData(params)}` : '';
  const response = await fetch(url + query, {
    method: 'GET'
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const json = (await response.json()) as GetResponse<T>;
  if (json.status !== 'success') {
    throw new Error(json.error.message);
  }
  return json.data;
}

export async function postAPI<T extends PostEndpoints>(endpoint: T, body: PostRequest<T>) {
  const url = buildURL(endpoint);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const json = (await response.json()) as PostResponse<T>;
  if (json.status !== 'success') {
    throw new Error(json.error.message);
  }
  return json.data;
}

/**
 * Builds the URL for the given endpoint.
 * @param endpoint The endpoint to build the URL for.
 * @returns The URL for the given endpoint.
 */
export function buildURL(endpoint: string): string {
  return `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api${endpoint}`;
}

export enum GetEndpoints {
  Settings = '/settings'
}

export enum PostEndpoints {
  Settings = '/settings'
}

/**
 * Encodes en object into a query string
 * @param data Params for the request
 * @returns The query string
 * @example
 * { test: 'test', test2: 'lül' } => 'test=test&test2=l%C3%BCl'
 */
function encodeQueryData<T extends GetEndpoints>(data: GetParams<T>): string {
  const ret = [];
  for (const d in data) {
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  }
  return ret.join('&');
}

// Helper Types to correctly type the API

export type PostRequest<Endpoint extends PostEndpoints> = Endpoint extends PostEndpoints.Settings
  ? Models.PostSettingsInput
  : never;

export type PostResponse<Endpoint extends PostEndpoints> = Endpoint extends PostEndpoints.Settings
  ? Models.PostSettingsOutput
  : never;

export type GetParams<Endpoint extends GetEndpoints> = Endpoint extends 's'
  ? Record<string, string>
  : never;

export type GetResponse<Endpoint extends GetEndpoints> = Endpoint extends GetEndpoints.Settings
  ? Models.GetSettingsOutput
  : never;

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;
