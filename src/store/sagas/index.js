import { all } from 'redux-saga/effects';
import studentSaga from './studentSaga';
import courseSaga from './courseSaga';
import feeSaga from './feeSaga';

function* rootSaga() {
  yield all([
    studentSaga(),
    courseSaga(),   
    feeSaga(), 
    // ...other reducers... 
  ]);
}
export default rootSaga;
