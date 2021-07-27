import {
  ADD_TRIP_REQUEST,
  ADD_TRIP_SUCCESS,
  ADD_TRIP_FAILED,
  GET_TRIP_REQUEST,
  GET_TRIP_SUCCESS,
  GET_TRIP_FAILED,
} from "./tripTypes";
import axios from "axios";
import { prefix } from "../../helpers/constant";
import { setToken } from "../../helpers/helpers";

export const addTrip = (newTrip) => async (dispatch) => {
  dispatch({ type: ADD_TRIP_REQUEST });
  try {
    setToken(); //put token on header : auth-token:cjebcjkeb$vjkbvbrvbjkrv
    const { data } = await axios.post(`${prefix}/api/trip/addtrip`, newTrip);
    dispatch({
      type: ADD_TRIP_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ADD_TRIP_FAILED,
      payload: err.response.data.errors,
    });
  }
};
