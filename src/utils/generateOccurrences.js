// src/utils/generateOccurrences.js
import { addDays, addWeeks, addMonths, addYears, isBefore, isEqual, format } from 'date-fns';

const getNthWeekdayOfMonth = (date, weekday, nth) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  let count = 0;
  let current = firstDayOfMonth;

  while (current.getMonth() === date.getMonth()) {
    if (current.getDay() === weekday) {
      count++;
      if (count === nth) {
        return current;
      }
    }
    current = addDays(current, 1);
  }
  return null;
};

const generateOccurrences = (state) => {
  const {
    startDate,
    endDate,
    frequency,
    interval,
    weekDays,
    pattern,
  } = state;

  if (!startDate) return [];

  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date(start.getFullYear() + 1, start.getMonth(), start.getDate());
  const occurrences = [];

  let current = new Date(start);

  while (isBefore(current, end) || isEqual(current, end)) {
    switch (frequency) {
      case 'daily':
        occurrences.push(new Date(current));
        current = addDays(current, interval);
        break;

      case 'weekly':
        const weekStart = new Date(current);
        for (let i = 0; i < 7; i++) {
          const temp = addDays(weekStart, i);
          if ((isBefore(temp, end) || isEqual(temp, end)) && weekDays.includes(temp.getDay())) {
            if (!occurrences.some(date => date.toDateString() === temp.toDateString())) {
              occurrences.push(temp);
            }
          }
        }
        current = addWeeks(current, interval);
        break;

      case 'monthly':
        if (pattern.enabled) {
          const nthWeekday = getNthWeekdayOfMonth(current, pattern.weekday, pattern.nth);
          if (nthWeekday && (isBefore(nthWeekday, end) || isEqual(nthWeekday, end))) {
            occurrences.push(nthWeekday);
          }
        } else {
          occurrences.push(new Date(current));
        }
        current = addMonths(current, interval);
        break;

      case 'yearly':
        occurrences.push(new Date(current));
        current = addYears(current, interval);
        break;

      default:
        break;
    }
  }

  // Sort and return as ISO strings
  return occurrences
    .filter(date => isBefore(date, end) || isEqual(date, end))
    .sort((a, b) => a - b)
    .map(date => format(date, 'yyyy-MM-dd'));
};

export default generateOccurrences;
