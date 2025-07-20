// Recurrence Pattern Selector Component
import React from 'react';
import { useRecurrence } from './RecurrenceContext';
export const  RecurrencePatternSelector = () => {
  const { recurrenceType, setRecurrenceType, customSettings, updateCustomSettings } = useRecurrence();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Recurrence Pattern</h3>
      
      <div className="grid grid-cols-2 gap-2">
        {['daily', 'weekly', 'monthly', 'yearly'].map((type) => (
          <button
            key={type}
            onClick={() => setRecurrenceType(type)}
            className={`p-3 rounded-lg border-2 transition-all ${
              recurrenceType === type
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-medium capitalize">{type}</div>
          </button>
        ))}
      </div>

      {/* Custom Interval */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Every</span>
        <input
          type="number"
          min="1"
          max="999"
          value={customSettings.interval}
          onChange={(e) => updateCustomSettings({ interval: parseInt(e.target.value) || 1 })}
          className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
        />
        <span className="text-sm text-gray-600">
          {recurrenceType === 'daily' && (customSettings.interval === 1 ? 'day' : 'days')}
          {recurrenceType === 'weekly' && (customSettings.interval === 1 ? 'week' : 'weeks')}
          {recurrenceType === 'monthly' && (customSettings.interval === 1 ? 'month' : 'months')}
          {recurrenceType === 'yearly' && (customSettings.interval === 1 ? 'year' : 'years')}
        </span>
      </div>

      {/* Weekly Day Selection */}
      {recurrenceType === 'weekly' && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">Select Days</div>
          <div className="flex flex-wrap gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <button
                key={day}
                onClick={() => {
                  const newDays = customSettings.weekdays.includes(index)
                    ? customSettings.weekdays.filter(d => d !== index)
                    : [...customSettings.weekdays, index];
                  updateCustomSettings({ weekdays: newDays });
                }}
                className={`px-3 py-1 rounded text-sm ${
                  customSettings.weekdays.includes(index)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Pattern Selection */}
      {recurrenceType === 'monthly' && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">Monthly Pattern</div>
          <div className="space-y-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="monthlyPattern"
                value="date"
                checked={customSettings.monthlyPattern === 'date'}
                onChange={(e) => updateCustomSettings({ monthlyPattern: e.target.value })}
              />
              <span className="text-sm">On day of month</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="monthlyPattern"
                value="weekday"
                checked={customSettings.monthlyPattern === 'weekday'}
                onChange={(e) => updateCustomSettings({ monthlyPattern: e.target.value })}
              />
              <span className="text-sm">On day of week</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};