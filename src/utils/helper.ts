import { IncomingHttpHeaders } from 'http';
import { NAME_HEADER_CLIENT } from './../database/database.dto';

export function getHostFromOrigin(header: IncomingHttpHeaders) {
  let origin = null;
  if (header) {
    if (header.origin) {
      origin = header.origin;
    } else if (header[NAME_HEADER_CLIENT]) {
      origin = header[NAME_HEADER_CLIENT];
    } else if (header.referer) {
      origin = header.referer;
    } else if (header.host) {
      origin = header.host;
    }
  }
  if (origin) {
    const url = origin.includes('://')
      ? origin.split('//')[1].split(':')[0]
      : origin.split(':')[0];
    return url.split('/')[0];
  } else {
    return null;
  }
}

export function timeConvert(n) {
  const num = n;
  const hours = num / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  let time = `${rhours} hora${rhours > 1 || rhours == 0 ? 's' : ''}`;
  if (rminutes > 0) {
    time = `${time} y ${rminutes} minuto${rminutes >= 1 ? 's' : ''}`;
  }
  return time;
}
