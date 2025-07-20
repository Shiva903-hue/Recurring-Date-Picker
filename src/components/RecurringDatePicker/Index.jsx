import React, { useState } from "react";
import { Calendar, X } from "lucide-react";
import { RecurrenceContext } from "./RecurrenceContext";
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isSameDay,
  getWeekdayName,
  getOrdinalSuffix,
} from "./recurrenceUtils";
import {RecurrencePatternSelector} from "./RecurrencePatternSelector";
import {DateRangeSelector} from "./DateRangeSelector";
import MiniCalendar from "./MiniCalendar";
import {RecurrenceSummary} from "./RecurrenceSummary";

const RecurringDatePicker = ({ onSave, onCancel, initialData = {} }) => {
  const [recurrenceType, setRecurrenceType] = useState(
    initialData.recurrenceType || "daily"
  );
  const [startDate, setStartDate] = useState(
    initialData.startDate || new Date()
  );
  const [endDate, setEndDate] = useState(initialData.endDate || null);
  const [hasEndDate, setHasEndDate] = useState(initialData.hasEndDate || false);
  const [customSettings, setCustomSettings] = useState({
    interval: initialData.customSettings?.interval || 1,
    weekdays: initialData.customSettings?.weekdays || [new Date().getDay()],
    monthlyPattern: initialData.customSettings?.monthlyPattern || "date",
    ...initialData.customSettings,
  });

  const updateCustomSettings = (updates) => {
    setCustomSettings((prev) => ({ ...prev, ...updates }));
  };

  const getRecurringDates = () => {
    const dates = [];
    const end =
      hasEndDate && endDate ? new Date(endDate) : addYears(startDate, 2);
    const maxDates = 100;

    switch (recurrenceType) {
      case "daily":
        for (
          let d = new Date(startDate);
          dates.length < maxDates && d <= end;
          d = addDays(d, customSettings.interval)
        ) {
          dates.push(new Date(d));
        }
        break;

      case "weekly":
        customSettings.weekdays.forEach((targetWeekday) => {
          let current = new Date(startDate);
          const daysToAdd = (targetWeekday - current.getDay() + 7) % 7;
          current = addDays(current, daysToAdd);

          if (current < startDate) current = addDays(current, 7);

          while (dates.length < maxDates && current <= end) {
            dates.push(new Date(current));
            current = addWeeks(current, customSettings.interval);
          }
        });
        break;

      case "monthly": {
        let current = new Date(startDate);
        while (dates.length < maxDates && current <= end) {
          if (customSettings.monthlyPattern === "date") {
            dates.push(new Date(current));
            current = addMonths(current, customSettings.interval);
          } else {
            const startWeekday = startDate.getDay();
            const startWeekOfMonth = Math.ceil(startDate.getDate() / 7);
            const monthStart = new Date(
              current.getFullYear(),
              current.getMonth(),
              1
            );
            let targetDate = addDays(
              monthStart,
              (startWeekday - monthStart.getDay() + 7) % 7
            );
            targetDate = addDays(targetDate, (startWeekOfMonth - 1) * 7);
            if (
              targetDate.getMonth() === current.getMonth() &&
              targetDate >= startDate
            ) {
              dates.push(new Date(targetDate));
            }
            current = addMonths(current, customSettings.interval);
          }
        }
        break;
      }

      case "yearly":
        for (
          let d = new Date(startDate);
          dates.length < maxDates && d <= end;
          d = addYears(d, customSettings.interval)
        ) {
          dates.push(new Date(d));
        }
        break;
    }

    const uniqueDates = dates.filter(
      (date, index, self) => index === self.findIndex((d) => isSameDay(d, date))
    );

    return uniqueDates.sort((a, b) => a - b).slice(0, maxDates);
  };

  const getRecurrenceDescription = () => {
    const interval = customSettings.interval;
    const intervalText = interval === 1 ? "" : `${interval} `;

    switch (recurrenceType) {
      case "daily":
        return `Every ${intervalText}${interval === 1 ? "day" : "days"}`;
      case "weekly": {
        const days = customSettings.weekdays.map(getWeekdayName);
        return `Every ${intervalText}${interval === 1 ? "week" : "weeks"} on ${days.join(", ")}`;
      }

      case "monthly":
        if (customSettings.monthlyPattern === "date") {
          const d = startDate.getDate();
          return `Every ${intervalText}${interval === 1 ? "month" : "months"} on the ${d}${getOrdinalSuffix(d)}`;
        } else {
          const week = Math.ceil(startDate.getDate() / 7);
          const weekday = getWeekdayName(startDate.getDay());
          return `Every ${intervalText}${interval === 1 ? "month" : "months"} on the ${["first", "second", "third", "fourth", "fifth"][week - 1]} ${weekday}`;
        }
      case "yearly": {
        const month = startDate.toLocaleDateString("en-US", { month: "long" });
        const day = startDate.getDate();
        return `Every ${intervalText}${interval === 1 ? "year" : "years"} on ${month} ${day}${getOrdinalSuffix(day)}`;
      }

      default:
        return "No recurrence pattern selected";
    }
  };

  const handleSave = () => {
    const data = {
      recurrenceType,
      startDate,
      endDate: hasEndDate ? endDate : null,
      hasEndDate,
      customSettings,
      description: getRecurrenceDescription(),
      dates: getRecurringDates(),
    };
    onSave?.(data);
  };

  const contextValue = {
    recurrenceType,
    setRecurrenceType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    hasEndDate,
    setHasEndDate,
    customSettings,
    updateCustomSettings,
    getRecurringDates,
    getRecurrenceDescription,
  };

  return (
    <RecurrenceContext.Provider value={contextValue}>
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="text-blue-600" />
            <span>Recurring Date Picker</span>
          </h2>
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          )}
        </div>

        <div className="p-6 grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <RecurrencePatternSelector />
            <DateRangeSelector />
          </div>
          <div className="space-y-8">
            <MiniCalendar />
            <RecurrenceSummary />
          </div>
        </div>

        <div className="p-6 flex justify-end space-x-4 border-t border-gray-200">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Save Recurrence
          </button>
        </div>
      </div>
    </RecurrenceContext.Provider>
  );
};

export default RecurringDatePicker;
