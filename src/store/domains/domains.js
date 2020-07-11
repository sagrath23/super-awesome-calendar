import { combineReducers } from 'redux';
import { reducer as calendarReducer, actions as calendarActions } from './calendar';

export const rootReducer = combineReducers({
  calendar: calendarReducer
});

export const actions = {
  ...calendarActions
};
