import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Form } from '../components/common/Form';
import { remindersSelector } from '../selectors';
import { validateMaxLength, extractDateAndTimeData } from '../utils/misc';
import { actions } from '../store/domains';
import { format, parseISO, setHours, setMinutes } from 'date-fns';

export const EditReminder = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { reminderId } = useParams();
  const {
    city,
    fullDate,
    id,
    name,
    time
  } = useSelector(remindersSelector).find((reminder) => reminder.id === reminderId);
  const [hours, minutes] = time.split(':');
  const [reminder, setReminder] = useState({
    city,
    date: fullDate,
    id,
    name,
    time: setHours(setMinutes(parseISO(format(fullDate, 'yyyy-MM-dd')), minutes), hours)
  });
  const handleCancelClick = () => history.push('/');
  const handleSaveClick = () => {
    const [month, day, time] = extractDateAndTimeData(reminder);

    dispatch(actions.editReminder({
      city: reminder.city,
      day,
      fullDate: reminder.date,
      id: reminder.id,
      month,
      name: reminder.name,
      time
    }));

    history.push('/');
  };
  const setReminderAttribute = (attribute) => (event) => {
    setReminder({
      ...reminder,
      [attribute]: attribute !== 'date' && attribute !== 'time' ? event.target.value : event 
    });
  };

  return (
    <Form>
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="filled-adornment-name">Name</InputLabel>
        <FilledInput
          id="filled-adornment-name"
          error={validateMaxLength(reminder.name)}
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
        <Button onClick={handleSaveClick} variant="outlined" color="primary">Save</Button>
        <Button onClick={handleCancelClick} variant="outlined" color="default">Cancel</Button>
      </DialogActions>
    </Form>
  );
};
