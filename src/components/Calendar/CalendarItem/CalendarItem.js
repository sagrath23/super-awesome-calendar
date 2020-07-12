import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
      {Children.map(children, (node, index) => <div key={`form-children-${index}`}>{node}</div>)}
    </Grid>
  );
};

CalendarItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node)
};

CalendarItem.defaultProps = {
  children: []
};
