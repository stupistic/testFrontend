import authVisibility from "./authVisibility";
import authMethod from "./authMethod";
import loggedIn from "./loggedIn";
import itemsCount from "./itemsCount";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    authVisibility,
    authMethod,
    loggedIn,
    itemsCount
});

export default allReducers;
