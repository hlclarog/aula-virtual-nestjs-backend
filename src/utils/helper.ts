export function getHostFromOrigin(origin) {
  return origin.includes('://')
    ? origin.split('//')[1].split(':')[0]
    : origin.split(':')[0];
}
