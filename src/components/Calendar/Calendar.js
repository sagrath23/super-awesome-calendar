import React from 'react';
import { useSelector } from 'react-redux';
import { Reminder } from '../Reminder';

export const Calendar = () => {
  const reminders = useSelector((state) => state.calendar.reminders);

  return (
    <>
      {reminders.map((reminder) => (<Reminder {...reminder} />))}
    </>
  );
};
