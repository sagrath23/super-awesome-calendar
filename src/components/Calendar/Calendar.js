import React from 'react';
import { useSelector } from 'react-redux';
import { Reminder } from '../Reminder';
import { remindersSelector } from '../../selectors';

export const Calendar = () => {
  const reminders = useSelector(remindersSelector);

  return (
    <>
      {reminders.map((reminder) => (<Reminder {...reminder} />))}
    </>
  );
};
