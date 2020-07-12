import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

export const CalendarItem = ({ children }) => {

  return (
    <Grid>
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
