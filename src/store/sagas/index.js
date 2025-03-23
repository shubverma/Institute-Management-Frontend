import { all } from 'redux-saga/effects';
import studentSaga from './studentSaga';
import courseSaga from './courseSaga';
import feeSaga from './feeSaga';// ...import other sagas...
// ...import other sagas...

function* rootSaga() {
  yield all([
    studentSaga(),
    courseSaga(),   // ...other sagas...
    feeSaga(),  ]);
    // ...other sagas...
}
export default rootSaga;
