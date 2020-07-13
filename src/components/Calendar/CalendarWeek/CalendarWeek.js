import React from 'react';
import PropTypes from 'prop-types';
import { addDays } from 'date-fns';
import { CalendarItem } from '../CalendarItem';

const generateWeekItems = (startDate) => {
  const items = [];

  for(let i = 0; i < 7; i++) {
    const itemDate = addDays(startDate, i);

    items.push({ itemDate });
  }

  return items;
};
// Should get reminders here, filter per date in the function, and add it as attribute in each item
export const CalendarWeek = ({ startDate }) => {
  const items = generateWeekItems(startDate, );

  return (
    <>
      {items.map((item, index) => (
        <CalendarItem key={`calendar-week-${index}`} date={item.itemDate} />
      ))}
    </>
  );
};

CalendarWeek.propTypes = {
  startDate: PropTypes.object.isRequired
};
