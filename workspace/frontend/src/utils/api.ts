/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getAPI(
  endpoint: GetEndpoints,
  params?: Record<string, string>
): Promise<Record<string, any>> {
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

export async function postAPI(
  endpoint: PostEndpoints,
  body: Record<string, any>
): Promise<Record<string, any>> {
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

export function buildURL(path: string): string {
  return `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api${path}`;
}

export enum GetEndpoints {
  Settings = '/settings'
}

export enum PostEndpoints {
  Settings = '/settings'
}

function encodeQueryData(data: Record<string, string>): string {
  const ret = [];
  for (const d in data) {
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  }
  return ret.join('&');
}
