import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  form: {
    width: '100%'
  }
}));

export const Form = ({ children }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <FormControl className={classes.form}>
      <Grid
        alignItems="stretch"
        container
        direction="column"
        justify="space-around"
        spacing={5}
      >
      {Children.map(children, (node, index) => <Grid item md key={`form-children-${index}`}>{node}</Grid>)}
      </Grid>
    </FormControl>
  );
};

Form.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node)
};

Form.defaultTypes = {
  children: []
};
