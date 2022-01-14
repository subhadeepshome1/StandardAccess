import { ApiCallInitiateActions } from "../actions/apiCallInitiationActions";
import { LoadingState } from "../../models/loaderModels";
import InitialState from "./initialState";
import { UserActionTypes } from "../actions/userActions";

const initialState: LoadingState = InitialState.loading;

export default function LoadingReducer(state: LoadingState = initialState, action:any) {
    switch(action.type) {
        case ApiCallInitiateActions.Initiate_Api_Call:
            return { ...state, loading: action.payload.loading, message: action.payload.message };
        case ApiCallInitiateActions.Api_Call_Success:
            return { ...state, loading: false };
        case ApiCallInitiateActions.Api_Call_Error:
            console.log("in error reducer");
            return { ...state, loading: false };
        case UserActionTypes.Login_Success_Action:
            return { ...state, loading: false };
        case UserActionTypes.Get_TreeID_Success_Action:
            return { ...state, loading: false };
        case UserActionTypes.Get_Tree_Data_Success_Action:
            return { ...state, loading: false };
        case UserActionTypes.Event_Status_Update_Success_Action:
            return { ...state, loading: false };
        case UserActionTypes.Get_Last_Attained_Success_Event:
            return { ...state, loading: false };
        default:
            return state;
    }
}