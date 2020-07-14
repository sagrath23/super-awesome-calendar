import { createActions, handleActions } from 'redux-actions';

export const initialState = {
  weather: [],
  ui: {
    isLoading: false
  }
};

const {
  weatherForecastRequest,
  weatherForecastSuccessful,
  weatherForecastFailure
} = createActions({
  WEATHER_FORECAST_REQUEST: ({ reminderId }) => ({ reminderId }),
  WEATHER_FORECAST_SUCCESSFUL: ({ weather }) => ({ weather }),
  WEATHER_FORECAST_FAILURE: undefined,
});

export const reducer = handleActions({
  [weatherForecastRequest]: (state) => ({ ...state, ui: { ...state.ui, isLoading: true }}),
  [weatherForecastSuccessful]: (state, { payload: { weather }}) => ({ ...state, weather, ui: { isLoading: false }}),
  [weatherForecastFailure]: () => (initialState)
}, initialState);

export const actions = {
  weatherForecastRequest,
  weatherForecastSuccessful,
  weatherForecastFailure
};
