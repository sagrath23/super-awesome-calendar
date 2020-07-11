import React from 'react';
import { useSelector } from 'react-redux';

export const Calendar = () => {
  const reminders = useSelector((state) => state.calendar.reminders);

  return (
    <>
      {reminders.map((reminder) => (<div>{reminder.name}</div>))}
    </>
  );
};
