import { createActions, handleActions } from 'redux-actions';
import { v4 as uuid } from 'uuid';

const findAndReplaceReminder = (reminders, newReminder) => {
  const index = reminders.findIndex((reminder) => reminder.id === newReminder.id);

  return [...reminders.slice(0, index), newReminder, ...reminders.slice(index + 1)];
} 

export const initialState = {
  reminders: [{
    city: 'Cali',
    day: '12',
    id: '1234',
    month: '07',
    fullDate: new Date(),
    name: 'Test Reminder',
    time: '12:15'
  }],
  ui: {
    isLoading: false
  }
};

const {
  addReminder,
  editReminder,
  deleteReminder,
  deleteAllReminders
} = createActions({
  ADD_REMINDER: ({
    city,
    day,
    fullDate,
    month,
    name,
    time
  }) => ({
    city,
    day,
    fullDate,
    month,
    name,
    time
  }),
  EDIT_REMINDER: ({
    city,
    day,
    id,
    month,
    name,
    time
  }) => ({
    city,
    day,
    id,
    month,
    name,
    time
  }),
  DELETE_REMINDER: ({ id }) => ({ id }),
  DELETE_ALL_REMINDERS: undefined
});

export const reducer = handleActions({
  [addReminder]: (state, {
    payload: {
      city,
      day,
      fullDate,
      month,
      name,
      time
    }
  } ) => ({
    ...state,
    reminders: [...state.reminders, {
      city,
      day,
      fullDate,
      id: uuid(),
      month,
      name,
      time
    }]
  }),
  [editReminder]: (state, {
    payload: {
      city,
      day,
      id,
      month,
      name,
      time
    }
  }) => ({
    ...state,
    reminders: findAndReplaceReminder(state.reminders, {
      city,
      day,
      id,
      month,
      name,
      time
    })
  }),
  [deleteReminder]: (state, { payload: { id }}) => ({
    ...state,
    reminders: state.reminders.filter((reminder) => reminder.id !== id)
  }),
  [deleteAllReminders]: (state) => ({ ...state, reminders: []})
}, initialState);

export const actions = {
  addReminder,
  editReminder,
  deleteReminder,
  deleteAllReminders
};