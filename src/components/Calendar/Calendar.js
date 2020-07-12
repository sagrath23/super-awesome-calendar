import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ReminderPill } from '../ReminderPill';
import { remindersSelector } from '../../selectors';
import { CalendarItem } from './CalendarItem';

// 7 columns x 5 rows
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
// const weeks = [1, 2, 3, 4, 5];
const useStyles = makeStyles((theme) => ({
  calendar: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridTemplateColumns: 'repeat(7, 1fr)'
  },
  dayCell: {
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
        {days.map((day) => (<CalendarItem><p>{day}</p></CalendarItem>))}
        {days.map(() => (<div><p>Hi</p></div>))}
      </div>
      {reminders.map((reminder) => (<ReminderPill {...reminder} />))}
    </>
  );
};
