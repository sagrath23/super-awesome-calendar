import React, { Children, useContext } from 'react';
import PropTypes from 'prop-types';
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
import { PageContext } from '../../../pages';

const useStyles = makeStyles(() => ({
  calendarItem: {
    border: '1px solid #DDDDDD'
  },
  todayItem: {
    backgroundColor: '#AAC7E7'
  },
  notInMonthItem: {
    color: '#CCC'
  },
  isWeekendItem: {
    backgroundColor: '#EEE'
  }
}));

export const CalendarItem = ({ date }) => {
  const { modalDialogContext: {
    isModalOpen,
    toggleModal,
    setModalContent
  } } = useContext(PageContext);
  const classes = useStyles();
  const handleClick = () => {
    //set modal content
    setModalContent(<ReminderForm />);
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
        <p>{getDate(date)}</p>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          { /** TODO: Should render here the reminders per day */}
          {Children.map([], (node, index) => <Grid item key={`form-children-${index}`} xs={12}>{node}</Grid>)}
        </Grid> 
      </Grid>
    </Grid>
  );
};

CalendarItem.propTypes = {
  date: PropTypes.object.isRequired
};
