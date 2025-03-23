export const FETCH_FEES_REQUEST = 'FETCH_FEES_REQUEST';
export const FETCH_FEES_SUCCESS = 'FETCH_FEES_SUCCESS';
export const FETCH_FEES_FAILURE = 'FETCH_FEES_FAILURE';

export const fetchFeesRequest = () => ({
  type: FETCH_FEES_REQUEST,
});

export const fetchFeesSuccess = (fees) => ({
  type: FETCH_FEES_SUCCESS,
  payload: fees,
});

export const fetchFeesFailure = (error) => ({
  type: FETCH_FEES_FAILURE,
  payload: error,
});
