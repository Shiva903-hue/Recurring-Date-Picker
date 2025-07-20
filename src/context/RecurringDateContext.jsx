// src/context/RecurringDateContext.jsx
import React, { createContext, useContext, useState } from 'react';

const RecurringDateContext = createContext();

export const useRecurringDate = () => {
  const context = useContext(RecurringDateContext);
  if (!context) {
    throw new Error('useRecurringDate must be used within a RecurringDateProvider');
  }
  return context;
};

export const RecurringDateProvider = ({ children }) => {
  const [state, setState] = useState({
    frequency: 'weekly',       // daily | weekly | monthly | yearly
    interval: 1,               // every X units
    selectedWeekdays: [],      // for weekly selection
    pattern: { week: 2, day: 'Tuesday' }, // for monthly pattern
    startDate: null,
    endDate: null,
    calculatedDates: []        // preview dates (generated from utils)
  });

  return (
    <RecurringDateContext.Provider value={{ state, setState }}>
      {children}
    </RecurringDateContext.Provider>
  );
};
