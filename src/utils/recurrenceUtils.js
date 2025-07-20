// src/utils/recurrenceUtils.js
import { addDays, addWeeks, addMonths, addYears, isBefore, isAfter, isSameDay } from 'date-fns';

export function generateRecurringDates({ frequency, interval, startDate, endDate, selectedWeekdays = [], pattern }) {
  if (!startDate) return [];

  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : addYears(start, 1); // default 1 year span

  let dates = [];

  switch (frequency) {
    case 'daily':
      for (let d = new Date(start); !isAfter(d, end); d = addDays(d, interval)) {
        dates.push(new Date(d));
      }
      break;

    case 'weekly':
      for (let d = new Date(start); !isAfter(d, end); d = addDays(d, 1)) {
        const weekday = d.toLocaleString('en-US', { weekday: 'long' });
        if (selectedWeekdays.includes(weekday)) {
          const diff = Math.floor((d - start) / (7 * 24 * 60 * 60 * 1000));
          if (diff % interval === 0) dates.push(new Date(d));
        }
      }
      break;

    case 'monthly':
      for (let d = new Date(start); !isAfter(d, end); d = addMonths(d, interval)) {
        const patternDate = getNthWeekdayOfMonth(d.getFullYear(), d.getMonth(), pattern.week, pattern.day);
        if (patternDate && !isBefore(patternDate, start) && !isAfter(patternDate, end)) {
          dates.push(patternDate);
        }
      }
      break;

    case 'yearly':
      for (let d = new Date(start); !isAfter(d, end); d = addYears(d, interval)) {
        dates.push(new Date(d));
      }
      break;

    default:
      break;
  }

  return dates;
}

function getNthWeekdayOfMonth(year, month, weekNumber, weekdayName) {
  const weekdayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(weekdayName);
  let count = 0;
  let lastMatch = null;

  for (let day = 1; day <= 31; day++) {
    const date = new Date(year, month, day);
    if (date.getMonth() !== month) break; // avoid overflow

    if (date.getDay() === weekdayIndex) {
      count++;
      lastMatch = new Date(date);

      if (count === weekNumber) return date;
    }
  }

  return weekNumber === -1 ? lastMatch : null;
}
