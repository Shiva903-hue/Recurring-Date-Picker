// MiniCalendar.jsx
import React, { useState, useMemo } from 'react';
import { useRecurrence } from './RecurrenceContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { isSameDay } from './recurrenceUtils';

const MiniCalendar = () => {
  const { getRecurringDates } = useRecurrence();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Safely memoize recurring dates using month + year as keys
  const recurringDates = useMemo(() => getRecurringDates(), [
    currentMonth.getMonth(),
    currentMonth.getFullYear(),
  ]);

  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  // const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - monthStart.getDay());

  const days = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  const isRecurringDate = (date) =>
    recurringDates.some((recurDate) => isSameDay(date, recurDate));
  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Preview Calendar</h3>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-lg font-semibold">
            {currentMonth.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </h3>
          <button
            onClick={() => navigateMonth(1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div
              key={index}
              className="text-center text-sm font-medium text-gray-500 p-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
            const isToday = isSameDay(day, new Date());
            const isRecurring = isRecurringDate(day);

            return (
              <div
                key={index}
                className={`h-8 w-8 flex items-center justify-center text-sm rounded
                  ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                  ${isToday ? 'bg-blue-100 text-blue-700 font-semibold' : ''}
                  ${isRecurring ? 'bg-green-100 text-green-700 font-medium border border-green-300' : ''}
                  ${isRecurring && isToday ? 'bg-green-200 text-green-800' : ''}`}
              >
                {day.getDate()}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 text-xs text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
              <span>Recurring dates</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-100 rounded"></div>
              <span>Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCalendar;
