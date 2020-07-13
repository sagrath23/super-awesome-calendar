import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  addWeeks,
  endOfWeek,
  getWeeksInMonth,
  startOfMonth,
  startOfWeek
} from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { CalendarWeek } from './CalendarWeek';
import { remindersSelector } from '../../selectors';

// 7 columns x 5 rows
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const useStyles = makeStyles(() => ({
  calendar: {
    border: '1px solid #DDDDDD',
    display: 'grid',
    gridAutoFlow: 'row',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridTemplateRows: 'auto repeat(5, 16vh)'
  },
  dayCell: {
    display: 'grid',
    alignContent: 'center',
    backgroundColor: '#507eb3',
    color: '#fff',
    justifyContent: 'center'
  }
}));

const calculateCalendarInfo = (date) => {
  const weekIntervals = [];
  const weeksInMonth = getWeeksInMonth(date);
  const startMonthDate = startOfMonth(date);

  // and calculate the week interval based on the current date
  for(let weekCount = 0; weekCount < weeksInMonth; weekCount += 1) {
    const baseDate = addWeeks(startMonthDate, weekCount);
    // get the start of the first week
    const startDate = startOfWeek(baseDate);
    // get the end of the first week
    const endDate = endOfWeek(baseDate);

    weekIntervals.push({ startDate, endDate })
  }

  return weekIntervals;
} 

export const Calendar = () => {
  const classes = useStyles();
  const reminders = useSelector(remindersSelector);
  const [weekIntervals, setWeekIntervals] = useState([]);

  // TODO: to handle more than one month, change this to pass a date instead of use new Date()
  useEffect(() => {
    const currentDate = new Date();
    setWeekIntervals(calculateCalendarInfo(currentDate));
  }, []);

  return (
    <div className={classes.calendar}>
      {days.map((day, index) => (
        <div key={`day-title-${index}`} className={classes.dayCell}>
          <p>{day}</p>
        </div>
      ))}
      {weekIntervals.map((weekInterval, index) => (
        <CalendarWeek key={`week-${index}`} days={days} reminders={reminders} startDate={weekInterval.startDate} endDate={weekInterval.endDate} />
      ))}
    </div>
  );
};
