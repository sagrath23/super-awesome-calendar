import { combineReducers } from 'redux';
import { reducer as calendarReducer, actions as calendarActions } from './calendar';
import { reducer as weatherForecastReducer, actions as weatherForecastActions } from './weatherForecast';


export const rootReducer = combineReducers({
  calendar: calendarReducer,
  weatherForecast: weatherForecastReducer
});

export const actions = {
  ...calendarActions,
  ...weatherForecastActions
};
