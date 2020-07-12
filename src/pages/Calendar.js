import React from 'react';
import { ReminderForm } from '../components/ReminderForm';
import { Calendar as CalendarComponent } from '../components/Calendar';

export const Calendar = () => {

  return (
    <>
      <div>
        <ReminderForm />
      </div>
      <div>
        <h3>Reminders</h3>
        <CalendarComponent />
      </div>
    </>
  );

};
