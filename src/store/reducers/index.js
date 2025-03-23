import { combineReducers } from 'redux';
import studentReducer from './studentReducer';
import courseReducer from './courseReducer';
import feeReducer from './feeReducer';// ...import other reducers...
// ...import other reducers...
const rootReducer = combineReducers({
  students: studentReducer,
  courses: courseReducer,
  fees: feeReducer,
  // ...other reducers...
});

export default rootReducer;
