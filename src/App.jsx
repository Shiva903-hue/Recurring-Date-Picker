import React, { useState } from 'react';
// import RecurringDatePicker from '../components/RecurringDatePicker/index';
import RecurringDatePicker from './components/RecurringDatePicker/index';
import { formatDate } from "./components/RecurringDatePicker/recurrenceUtils";

export default function App() {
  const [isPickerOpen, setIsPickerOpen] = useState(true);
  const [savedRecurrence, setSavedRecurrence] = useState(null);

  const handleSave = (data) => {
    setSavedRecurrence(data);
    setIsPickerOpen(false);
    console.log('Saved Recurrence:', data);
  };

  const handleCancel = () => {
    setIsPickerOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {!isPickerOpen ? (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recurring Date Picker Demo</h2>
          {savedRecurrence ? (
            <div className="bg-green-50 border border-green-200 p-4 rounded space-y-2">
              <p className="text-green-700 font-semibold">{savedRecurrence.description}</p>
              <p className="text-green-600 text-sm">
                Start: {formatDate(savedRecurrence.startDate)}
                {savedRecurrence.hasEndDate && savedRecurrence.endDate && (
                  <> | End: {formatDate(savedRecurrence.endDate)}</>
                )}
              </p>
              <p className="text-green-600 text-sm">
                Next occurrences: {savedRecurrence.dates.slice(0, 3).map(d => d.toLocaleDateString()).join(', ')}
              </p>
            </div>
          ) : (
            <p className="text-gray-600 mb-4">No recurrence pattern saved yet.</p>
          )}

          <button
            onClick={() => setIsPickerOpen(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Open Recurring Date Picker
          </button>
        </div>
      ) : (
        <RecurringDatePicker onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  );
}
