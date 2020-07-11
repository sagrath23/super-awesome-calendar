import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
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

export const ReminderForm = () => {
  const dispatch = useDispatch();
  const [reminder, setReminder] = useState({ ...baseReminder });
  const setReminderAttribute = (attribute) => (event) => {
    setReminder({
      ...reminder,
      [attribute]: attribute !== 'stocked' ? event.target.value : event.target.checked 
    });
  };
  const addReminder = (reminder) => {
    dispatch(actions.addReminder(reminder));
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
            label="Date picker inline"
            value={reminder.date}
            onChange={setReminderAttribute('date')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={reminder.time}
            onChange={setReminderAttribute('time')}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="filled-adornment-description">Description</InputLabel>
        <FilledInput
          id="filled-adornment-description"
          value={reminder.description}
          onChange={setReminderAttribute('description')} 
        />
      </FormControl>
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="filled-adornment-price">Price</InputLabel>
        <FilledInput
          id="filled-adornment-price"
          value={reminder.price}
          onChange={setReminderAttribute('price')} 
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <Button onClick={() => addReminder(reminder)} variant="contained" color="primary">
        Add
      </Button>
      <Button onClick={clearForm} variant="outlined" color="default">
        Clear
      </Button>
    </Form>
  );
};