import { createActions, handleActions } from 'redux-actions';

export const initialState = {
  reminders: [],
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
  EDIT_REMINDER: () => {},
  DELETE_REMINDER: () => {},
  DELETE_ALL_REMINDER: () => {}
});

export const reducer = handleActions({
  [addReminder]: (state, { payload: {
    city,
    day,
    id,
    month,
    name,
    time
  } } ) => ({
    ...state,
    reminders: [...state.reminders, {
      city,
      day,
      id,
      month,
      name,
      time
    }]
  }),
  [editReminder]: () => {},
  [deleteReminder]: () => {},
  [deleteAllReminders]: () => {}
}, initialState);

export const actions = {
  addReminder,
  editReminder,
  deleteReminder,
  deleteAllReminders
};