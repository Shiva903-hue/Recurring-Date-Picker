// Summary Component
import { useRecurrence } from "./RecurrenceContext";
import {formatDate} from './recurrenceUtils';
import { Clock } from 'lucide-react';


export const RecurrenceSummary = () => {
  const { getRecurrenceDescription, getRecurringDates } = useRecurrence();
  const description = getRecurrenceDescription();
  const dates = getRecurringDates().slice(0, 5); // Show first 5 dates

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Pattern:</div>
        <div className="text-gray-900">{description}</div>
        
        {dates.length > 0 && (
          <div className="mt-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Next occurrences:</div>
            <div className="space-y-1">
              {dates.map((date, index) => (
                <div key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                  <Clock size={12} />
                  <span>{formatDate(date)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
