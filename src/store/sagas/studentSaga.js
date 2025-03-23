import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_STUDENTS_REQUEST,
  fetchStudentsSuccess,
  fetchStudentsFailure,
} from '../actions/studentActions';

function* fetchStudents() {
  try {
    const response = yield call(axios.get, 'http://localhost:5555/students/');
    yield put(fetchStudentsSuccess(response.data.data));
  } catch (error) {
    yield put(fetchStudentsFailure(error.message));
  }
}

function* studentSaga() {
  yield takeEvery(FETCH_STUDENTS_REQUEST, fetchStudents);
}

export default studentSaga;
