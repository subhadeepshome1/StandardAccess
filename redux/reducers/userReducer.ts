import { UserActionTypes } from "../actions/userActions";
import { UserState } from "../../models/userModels";
import InitialState from "./initialState";

const initialState: UserState = InitialState.user;

export default function UserReducer(
    state: UserState = initialState,
    action: any,
) {
    switch(action.type) {
        case UserActionTypes.Login_Action: 
            return { ...state };
        case UserActionTypes.Login_Success_Action:
            return { ...state, userData: action.payload };
        case UserActionTypes.Get_TreeID_Success_Action:
            return { ...state, tree_id: action.payload };
        case UserActionTypes.Get_Tree_Data_Action: 
            return { ...state };
        case UserActionTypes.Get_Tree_Data_Success_Action:
            return { ...state, treeData: action.payload };
        case UserActionTypes.Event_Status_Update_Action:
            return { ...state };
        case UserActionTypes.Event_Status_Update_Success_Action:
            return { ...state };
        case UserActionTypes.Get_Last_Attained_Event:
            return { ...state };
        case UserActionTypes.Get_Last_Attained_Success_Event:
            return { ...state, last_attended_event: action.payload };
        case UserActionTypes.Logout_Action:
            return { userData: undefined };
        default:
            return state;
    }
}