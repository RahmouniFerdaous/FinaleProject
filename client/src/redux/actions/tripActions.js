import {
  ADD_TRIP_REQUEST,
  ADD_TRIP_SUCCESS,
  ADD_TRIP_FAILED,
  GET_TRIP_REQUEST,
  GET_TRIP_SUCCESS,
  GET_TRIP_FAILED,
  GET_ALL_TRIP_REQUEST,
  GET_ALL_TRIP_SUCCESS,
  GET_ALL_TRIP_FAILED,
  GET_TRIP_COUNT_REQUEST,
  GET_TRIP_COUNT_SUCCESS,
  GET_TRIP_COUNT_FAILED
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

export const getMyTrip = () => async (dispatch) => {
  dispatch({ type: GET_TRIP_REQUEST });
  try {
    setToken();
    const { data } = await axios.get(`${prefix}/api/trip/mytrips`);
    dispatch({
      type: GET_TRIP_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_TRIP_FAILED,
      payload: err.response.data.errors,
    });
  }
};

export const getAllTrips = (page,limit) => async (dispatch) => {
  dispatch({ type: GET_ALL_TRIP_REQUEST });
  try {
    const { data } = await axios.get(`${prefix}/api/trip/alltrips?page=${page}&limit=${limit}`);
    dispatch({
      type: GET_ALL_TRIP_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_TRIP_FAILED,
      payload: err.response.data.errors,
    });
  }
};


export const getTripCount = () => async (dispatch) => {
  dispatch({ type: GET_TRIP_COUNT_REQUEST });
  try {
    const { data } = await axios.get(`${prefix}/api/trip/tripCount`);
    dispatch({
      type: GET_TRIP_COUNT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_TRIP_COUNT_FAILED,
      payload: err.response.data.errors,
    });
  }
};
