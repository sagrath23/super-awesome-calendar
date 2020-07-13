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

  console.log(reminder, 'here');

  try {
    const requestResult = yield call(getWeatherForecast, reminder.city);

    yield put(actions.productListSuccess(requestResult));
  } catch (error) {
    console.error(error);

    yield put(actions.productListFailed());
  }
}

export function* watchProductListRequest() {
  yield takeEvery(actions.weatherForecastRequest, loadWeatherForecastForReminder)
}