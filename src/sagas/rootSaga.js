import { all } from 'redux-saga/effects';
import { watchWeatherForecastRequest } from './weatherForecasSaga';

export function* rootSaga() {
  yield all([watchWeatherForecastRequest()]);
}
