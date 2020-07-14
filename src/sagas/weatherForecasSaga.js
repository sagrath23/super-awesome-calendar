import {
  call,
  put,
  select,
  takeEvery
} from 'redux-saga/effects';
import { getWeatherForecast } from '../services';
import { actions } from '../store/domains';
import { remindersSelector } from '../selectors';



export function* loadWeatherForecastForReminder({ payload: { reminderId }}) {
  const reminders = yield select(remindersSelector);
  const reminder = reminders.find((reminder) => reminder.id === reminderId); 

  try {
    const { forecast } = yield call(getWeatherForecast, reminder.city);

    yield put(actions.weatherForecastSuccessful({ weather: forecast }));
  } catch (error) {
    console.error(error);

    yield put(actions.productListFailed());
  }
}

export function* watchWeatherForecastRequest() {
  yield takeEvery(actions.weatherForecastRequest, loadWeatherForecastForReminder)
}