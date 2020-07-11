import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMonth, getDate, format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Form } from '../common/Form';
import { actions } from '../../store/domains';

const baseReminder = {
  city: '',
  date: new Date(),
  name: '',
  time: new Date()
};
const extractDateAndTimeData = ({ date, time }) => [getMonth(date), getDate(date), format(time, 'HH:mm')]; 

export const ReminderForm = () => {
  const dispatch = useDispatch();
  const [reminder, setReminder] = useState({ ...baseReminder });
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
  };
  const clearForm = () => {
    setReminder({ ...baseReminder });
  };

  return (
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
      <Button onClick={addReminder} variant="contained" color="primary">
        Add
      </Button>
      <Button onClick={clearForm} variant="outlined" color="default">
        Clear
      </Button>
    </Form>
  );
};
