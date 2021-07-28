import {
  GET_TRIP_REQUEST,
  GET_TRIP_SUCCESS,
  GET_TRIP_FAILED,
  GET_ALL_TRIP_REQUEST,
  GET_ALL_TRIP_SUCCESS,
  GET_ALL_TRIP_FAILED,
} from "../actions/tripTypes";

const initState = {
  tripList: [],
  errors: null,
  isLoading: true,
};

const tripReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_TRIP_REQUEST:
    case GET_ALL_TRIP_REQUEST:
      return {
        ...state,
        errors: null,
        isLoading: false,
      };
    case GET_TRIP_SUCCESS:
    case GET_ALL_TRIP_SUCCESS:
      return {
        ...state,
        tripList: payload,
        isLoading: false,
      };

    case GET_TRIP_FAILED:
    case GET_ALL_TRIP_FAILED:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };

    default:
      return state;
  }
};

export default tripReducer;
