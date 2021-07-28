import { combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import tripReducer from "../reducers/tripReducer";

export default combineReducers({
  auth: authReducer,
  trips: tripReducer,
});
