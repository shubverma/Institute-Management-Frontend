import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_COURSES_REQUEST,
  fetchCoursesSuccess,
  fetchCoursesFailure,
} from '../actions/courseActions';

function* fetchCourses() {
  try {
    const response = yield call(axios.get, 'http://localhost:5555/courses/');
    yield put(fetchCoursesSuccess(response.data.data));
  } catch (error) {
    yield put(fetchCoursesFailure(error.message));
  }
}

function* courseSaga() {
  yield takeEvery(FETCH_COURSES_REQUEST, fetchCourses);
}

export default courseSaga;
