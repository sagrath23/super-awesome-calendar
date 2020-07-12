import React from 'react';
import { CalendarItem } from '../CalendarItem';

export const CalendarWeek = ({ days }) => {
  return (
    <>
      {days.map(() => (<CalendarItem />))}
    </>
  );
};
