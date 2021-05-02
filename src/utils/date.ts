import * as moment from 'moment';

export function getActualDate() {
  const date = moment().toISOString();
  return date;
}

export function getActualDateFormat() {
  const date = moment().format('DD/MM/YYYY');
  return date;
}

export function subtractDaysForActualDate(days) {
  const start = moment().subtract(days, 'days').format('MM/DD/YYYY');
  const end = moment().format('MM/DD/YYYY');
  return {
    start,
    end,
  };
}
