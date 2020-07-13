import React from 'react';
import PropTypes from 'prop-types';
import { addDays, getWeek } from 'date-fns';
import { CalendarItem } from '../CalendarItem';

export const CalendarWeek = ({ startDate }) => {
  const items = [];

  for(let i = 0; i < 7; i++) {
    const itemDate = addDays(startDate, i);

    items.push({ itemDate });
  }
  
  return (
    <>
      {items.map((item) => (
        <CalendarItem key={`calendar-week-${getWeek(item.itemDate)}`} date={item.itemDate} />
      ))}
    </>
  );
};

CalendarWeek.propTypes = {
  startDate: PropTypes.object.isRequired
};
