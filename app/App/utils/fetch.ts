export default async function fetchTimeout(
  url: string,
  opts = {} as Omit<RequestInit, 'signal'>,
  ms = 5000,
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  const res = await fetch(url, { signal: controller.signal, ...opts }).finally(
    () => clearTimeout(timeout),
  );
  return res;
}
