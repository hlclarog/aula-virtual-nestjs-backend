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
