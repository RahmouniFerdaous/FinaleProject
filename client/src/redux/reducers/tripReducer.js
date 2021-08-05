import {
  GET_TRIP_REQUEST,
  GET_TRIP_SUCCESS,
  GET_TRIP_FAILED,
  GET_ALL_TRIP_REQUEST,
  GET_ALL_TRIP_SUCCESS,
  GET_ALL_TRIP_FAILED,
  GET_TRIP_COUNT_SUCCESS,
  FIND_TRIPS_REQUEST,
  FIND_TRIPS_SUCCESS,
  FIND_TRIPS_FAILED
} from "../actions/tripTypes";

const initState = {
  tripList: [],
  errors: null,
  isLoading: false,
};

const tripReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_TRIP_REQUEST:
    case GET_ALL_TRIP_REQUEST:
    case  FIND_TRIPS_REQUEST:
      return {
        ...state,
        errors: null,
        isLoading: true,
      };
      case GET_TRIP_COUNT_SUCCESS:
      return {
           ...state,
           count:payload.count
      }
    case GET_TRIP_SUCCESS:
    case GET_ALL_TRIP_SUCCESS:
      return {
        ...state,
        tripList: payload,
        isLoading: false,
      };
      case FIND_TRIPS_SUCCESS:
        return {
          ...state,
          tripList: payload,
          isLoading: false,
          count:payload.length
        };

    case GET_TRIP_FAILED:
    case GET_ALL_TRIP_FAILED:
    case FIND_TRIPS_FAILED:
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
