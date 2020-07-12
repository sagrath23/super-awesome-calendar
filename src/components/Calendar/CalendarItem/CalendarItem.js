import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  calendarItem: {
    border: '1px solid #DDDDDD'
  }
}));

export const CalendarItem = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.calendarItem}>
      <Grid item xs={1}><p>day</p></Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {Children.map(children, (node, index) => <Grid item key={`form-children-${index}`} xs={12}>{node}</Grid>)}
        </Grid> 
      </Grid>
    </Grid>
  );
};

CalendarItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node)
};

CalendarItem.defaultProps = {
  children: []
};
