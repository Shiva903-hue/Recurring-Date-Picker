// Date Range Selector Component

import React from 'react';
import { useRecurrence } from './RecurrenceContext';


export const DateRangeSelector = () => {
  const { startDate, endDate, setStartDate, setEndDate, hasEndDate, setHasEndDate } = useRecurrence();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Date Range</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate.toISOString().split('T')[0]}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="hasEndDate"
            checked={hasEndDate}
            onChange={(e) => setHasEndDate(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="hasEndDate" className="text-sm font-medium text-gray-700">
            Set end date
          </label>
        </div>

        {hasEndDate && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={endDate ? endDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              min={startDate.toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};
