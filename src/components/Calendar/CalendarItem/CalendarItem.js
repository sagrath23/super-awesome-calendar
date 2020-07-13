import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isSameDay } from 'date-fns';
import clsx from 'clsx';
import {
  getDate,
  isThisMonth,
  isToday,
  isWeekend
} from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ReminderForm } from '../../ReminderForm';
import { ReminderPill } from '../../ReminderPill';
import { PageContext } from '../../../pages';
import { remindersSelector } from '../../../selectors';

const useStyles = makeStyles(() => ({
  calendarItem: {
    border: '1px solid #DDDDDD',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  date: {
    marginLeft: '0.75rem'
  },
  todayItem: {
    backgroundColor: '#AAC7E7'
  },
  notInMonthItem: {
    color: '#CCC'
  },
  isWeekendItem: {
    backgroundColor: '#EEE'
  },
  isWeekendDate: {
    color: '#507eb3',
    fontWeight: 'bold'
  }
}));

export const CalendarItem = ({ date }) => {
  const reminders = useSelector(remindersSelector);
  const { modalDialogContext: {
    isModalOpen,
    toggleModal,
    setModalContent
  } } = useContext(PageContext);
  const classes = useStyles();
  const handleClick = () => {
    //set modal content
    setModalContent(<ReminderForm date={date} closeModal={toggleModal} />);
    // open the modal dialog
    toggleModal(!isModalOpen);
  };

  return (
    <Grid
      className={clsx(classes.calendarItem, {
        [classes.todayItem]: isToday(date),
        [classes.isWeekendItem]: isWeekend(date) && !isToday(date),
        [classes.notInMonthItem]: !isThisMonth(date)
      })}
      onClick={handleClick}
    >
      <Grid item xs={12}>
        <p className={clsx(classes.date, {[classes.isWeekendDate]: isWeekend(date) && isThisMonth(date)})}>{getDate(date)}</p>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {reminders.filter((reminder) => isSameDay(date, reminder.fullDate)).map((reminder, index) => (
            <Grid item key={`reminder-item-${index}`} xs={12}>
              <ReminderPill id={reminder.id} name={reminder.name} />
            </Grid>
          ))}
        </Grid> 
      </Grid>
    </Grid>
  );
};

CalendarItem.propTypes = {
  date: PropTypes.object.isRequired
};
