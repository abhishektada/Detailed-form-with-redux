import { combineReducers } from "redux";
import firstnameReducer from "./firstnameReducer";
import copyReducer from "./copyReducer"

const reducers = combineReducers({
  form: firstnameReducer,
  copy: copyReducer
});

export default reducers;
