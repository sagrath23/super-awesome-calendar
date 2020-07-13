import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
  },
  reminderNameContainer: {
    overflow: 'hidden'
  },
  reminderName: {
    textOverflow: 'ellipsis'
  },
  reminderPill: {
    '&:hover': {
      backgroundColor: '#EEE'
    }
  }
}));

export const ReminderPill = ({
  id,
  name
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const handleClick = (event) => {
    // to avoid the modal's opening
    event.stopPropagation();
    dispatch(actions.deleteReminder({ id }));
  };
  const handleRedirectToDetail = (event) => {
    event.stopPropagation();
    history.push(`/reminders/${id}`);
  };

  return (
    <Grid
      alignItems="center"
      className={classes.reminderPill}
      container
      justify="center"
      spacing={0.5}
      onClick={handleRedirectToDetail}
    >
      <Grid item xs={2}>
        <div className={classes.colorIndicator}></div>
      </Grid>
      <Grid className={classes.reminderNameContainer} item xs={8}>
        <p className={classes.reminderName}>{name}</p>
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
