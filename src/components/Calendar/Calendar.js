import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CalendarWeek } from './CalendarWeek';
import { ReminderPill } from '../ReminderPill';
import { remindersSelector } from '../../selectors';

// 7 columns x 5 rows
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const weeks = [1, 2, 3, 4, 5];
const useStyles = makeStyles((theme) => ({
  calendar: {
    border: '1px solid #DDDDDD',
    display: 'grid',
    gridAutoFlow: 'row',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridTemplateRows: 'auto repeat(5, 20%)',
    height: '80vh'
  },
  dayCell: {
    display: 'grid',
    alignContent: 'center',
    backgroundColor: '#507eb3',
    color: '#fff',
    justifyContent: 'center'
  }
}));

export const Calendar = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const reminders = useSelector(remindersSelector);
  return (
    <>
      <div className={classes.calendar}>
        {days.map((day) => (<div className={classes.dayCell}><p>{day}</p></div>))}
        <CalendarWeek days={days} />
        <CalendarWeek days={days} />
        <CalendarWeek days={days} />
        <CalendarWeek days={days} />
        <CalendarWeek days={days} />
      </div>
      {reminders.map((reminder) => (<ReminderPill {...reminder} />))}
    </>
  );
};
