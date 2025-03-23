import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_FEES_REQUEST,
  fetchFeesSuccess,
  fetchFeesFailure,
} from '../actions/feeActions';

function* fetchFees() {
  try {
    const response = yield call(axios.get, 'http://localhost:5555/feeSubmissions');
    yield put(fetchFeesSuccess(response.data));
  } catch (error) {
    yield put(fetchFeesFailure(error.message));
  }
}

function* feeSaga() {
  yield takeEvery(FETCH_FEES_REQUEST, fetchFees);
}

export default feeSaga;
