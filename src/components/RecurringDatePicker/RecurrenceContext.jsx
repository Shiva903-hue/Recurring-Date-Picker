import React, { createContext, useContext } from 'react';

export const RecurrenceContext = createContext();

export const useRecurrence = () => {
  const context = useContext(RecurrenceContext);
  if (!context) {
    throw new Error('useRecurrence must be used within RecurrenceProvider');
  }
  return context;
};
