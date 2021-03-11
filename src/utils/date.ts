import * as moment from 'moment';

export function getActualDate() {
  const date = moment().toISOString();
  return date;
}
