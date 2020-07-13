import React, { Children } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { getDate, isThisMonth, isToday } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  calendarItem: {
    border: '1px solid #DDDDDD'
  },
  todayItem: {
    backgroundColor: '#AAC7E7'
  },
  notInMonthItem: {
    color: '#CCC'
  }
}));

export const CalendarItem = ({ date }) => {
  const classes = useStyles();

  return (
    <Grid className={clsx(classes.calendarItem, {
      [classes.todayItem]: isToday(date),
      [classes.notInMonthItem]: !isThisMonth(date)
    })}>
      <Grid item xs={12}>
        <p>{getDate(date)}</p>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {Children.map([], (node, index) => <Grid item key={`form-children-${index}`} xs={12}>{node}</Grid>)}
        </Grid> 
      </Grid>
    </Grid>
  );
};

CalendarItem.propTypes = {
  date: PropTypes.object.isRequired
};
