import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getMonth, getDate, format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Form } from '../common/Form';
import { actions } from '../../store/domains';

const extractDateAndTimeData = ({ date, time }) => [getMonth(date), getDate(date), format(time, 'HH:mm')];
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export const ReminderForm = ({ date, closeModal}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [reminder, setReminder] = useState({
    city: '',
    date,
    name: '',
    time: new Date()
  });
  const setReminderAttribute = (attribute) => (event) => {
    setReminder({
      ...reminder,
      [attribute]: attribute !== 'date' && attribute !== 'time' ? event.target.value : event 
    });
  };
  const addReminder = () => {
    const [month, day, time] = extractDateAndTimeData(reminder);

    dispatch(actions.addReminder({
      city: reminder.city,
      day,
      month,
      name: reminder.name,
      time
    }));
    clearForm();
    // close modal
    closeModal(false);
  };
  const clearForm = () => {
    setReminder({
      city: '',
      date,
      name: '',
      time: new Date()
    });
  };
  const handleClose = () => closeModal(false);

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Add reminder
          </Typography>
          <Button autoFocus color="inherit" onClick={addReminder}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Form>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="filled-adornment-name">Name</InputLabel>
            <FilledInput
              id="filled-adornment-name"
              value={reminder.name}
              onChange={setReminderAttribute('name')} 
            />
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM"
                margin="normal"
                id="date-picker-inline"
                label="Date"
                value={reminder.date}
                onChange={setReminderAttribute('date')}
                KeyboardButtonProps={{
                  'aria-label': 'Date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time"
                value={reminder.time}
                onChange={setReminderAttribute('time')}
                KeyboardButtonProps={{
                  'aria-label': 'Time',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="filled-adornment-name">City</InputLabel>
            <FilledInput
              id="filled-adornment-city"
              value={reminder.city}
              onChange={setReminderAttribute('city')} 
            />
          </FormControl>
          <DialogActions>
            <Button onClick={clearForm} variant="outlined" color="default">Clear</Button>
          </DialogActions>
        </Form>
      </DialogContent>
    </>
  );
};

ReminderForm.propTypes = {
  date: PropTypes.object, 
  closeModal: PropTypes.func
};

ReminderForm.defaultProps = {
  date: new Date(),
  closeModal: () => {}
};
