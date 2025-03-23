import {
  FETCH_FEES_REQUEST,
  FETCH_FEES_SUCCESS,
  FETCH_FEES_FAILURE,
} from '../actions/feeActions';

const initialState = {
  fees: [],
  loading: false,
  error: null,
};

const feeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEES_REQUEST:
      return { ...state, loading: true };
    case FETCH_FEES_SUCCESS:
      return { ...state, loading: false, fees: action.payload };
    case FETCH_FEES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default feeReducer;
