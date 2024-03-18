import { all } from 'redux-saga/effects';
import { watchFetchData } from '../features/UserSaga';

export default function* rootSaga() {
  yield all([watchFetchData()]);
}
