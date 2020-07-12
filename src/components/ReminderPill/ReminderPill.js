import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear'
import { actions } from '../../store/domains';

const useStyles = makeStyles(() => ({
  colorIndicator: {
    backgroundColor: '#507eb3',
    borderRadius: '50%',
    height: '1.5rem',
    width: '1.5rem'
  }
}));

export const ReminderPill = ({
  id,
  name
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleClick = () => {
    dispatch(actions.deleteReminder({ id }));
  };

  return (
    <Grid
      alignItems="center"
      container
      justify="center"
      spacing={1}
    >
      <Grid item xs={2}>
        <div className={classes.colorIndicator}></div>
      </Grid>
      <Grid item xs={8}>
        <p>{name}</p>
      </Grid>
      <Grid item xs={2}>
        <IconButton aria-label="delete" color="secondary" onClick={handleClick} size="small">
          <ClearIcon fontSize="inherit" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

ReminderPill.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
