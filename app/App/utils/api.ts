export function getAlarms() {
  return fetchData('/alarms');
}

async function fetchData(endpoint: string) {
  const respone = await fetch(`http://localhost:3535/api${endpoint}`);
  if (!respone.ok) {
    throw new Error(respone.statusText);
  }
  const json = await respone.json();
  return json;
}
