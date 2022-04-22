export function getAlarms() {
  return fetchData('/alarms');
}

async function fetchData(endpoint: string) {
  const response = await fetch(`http://192.168.178.55:3535/api${endpoint}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const json = await response.json();
  return json;
}
