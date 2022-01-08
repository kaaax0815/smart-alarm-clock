/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Models from 'backend';

export async function getAPI<T extends GetEndpoints>(
  endpoint: T,
  params?: GetParams<T>
): Promise<GetResponse<T>> {
  const url = buildURL(endpoint);
  const query = params ? `?${encodeQueryData(params)}` : '';
  const response = await fetch(url + query, {
    method: 'GET'
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function postAPI<T extends PostEndpoints>(
  endpoint: T,
  body: PostRequest<T>
): Promise<PostResponse<T>> {
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
  return response.json();
}

/**
 * Builds the URL for the given endpoint.
 * @param endpoint The endpoint to build the URL for.
 * @returns The URL for the given endpoint.
 */
export function buildURL(endpoint: string): string {
  return `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api${endpoint}`;
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
  ? Models.postSettingsRequest
  : never;

export type PostResponse<Endpoint extends PostEndpoints> = Endpoint extends PostEndpoints.Settings
  ? Models.postSettingsResponse
  : never;

export type GetParams<Endpoint extends GetEndpoints> = Endpoint extends 's'
  ? Record<string, string>
  : never;

export type GetResponse<Endpoint extends GetEndpoints> = Endpoint extends GetEndpoints.Settings
  ? Models.getSettingsResponse
  : never;
