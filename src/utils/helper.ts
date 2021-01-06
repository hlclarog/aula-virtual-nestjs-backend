export function getHostFromOrigin(origin) {
  const url = origin.includes('://')
    ? origin.split('//')[1].split(':')[0]
    : origin.split(':')[0];
  return url.split('/')[0];
}
