import { combineReducers } from "redux"
import LoadingReducer from "./loadingReducer";
import UserReducer from "./userReducer";

const rootReducer = combineReducers({
    user: UserReducer,
    loading: LoadingReducer
});

export default rootReducer;