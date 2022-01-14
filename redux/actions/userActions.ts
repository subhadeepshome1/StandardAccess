import { getCurrentTaskID, getTreeData, getTreeId, LoginService, updateEvent } from "../../services/UserServices/userServices";
import { LoginPayload, startPayload } from "../../models/userModels";
import { ApiCallErrorAction, ApiCallInitiateAction } from "./apiCallInitiationActions";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from "../../services/ToastService/toastService";


export enum UserActionTypes {
    Login_Action = "[USER] Login Action",
    Login_Success_Action = "[USER] Login Success Action",
    Get_Tree_Data_Action = "[USER] Get Tree Data Action",
    Get_Tree_Data_Success_Action = "[USER] Get Tree Data Success Action",
    Event_Status_Update_Action = "[USER] Event Status Update Action",
    Event_Status_Update_Success_Action = "[USER] Event Status Update Success Action",
    Get_TreeID_Success_Action = "[USER] Get Tree Id Success Action",
    Logout_Action = "[USER] Logout Action",
    Get_Last_Attained_Event = "[USER] Get Last Attained Event Action",
    Get_Last_Attained_Success_Event = "[USER] Get Last Attained Event Success Action"
}

export const LoginAction = (payload: LoginPayload,props: any) => {
    return (dispatch: any, getState: any) => {
        dispatch(ApiCallInitiateAction({
            loading: true,
            message: "Logging you in. Please wait..."
        }))
        
        return LoginService(payload).then(async(response) => {
            console.log(response.data);
            await AsyncStorage.setItem('userData', JSON.stringify(response.data));
            dispatch(LoginSuccessAction(response.data));
            props.navigation.navigate('dashboard');
            showToast("Olet nyt kirjautunut sisään onnistuneesti"); // You are now Successfully Logged In
        }).catch(err => {
            console.log("error", err);
            // Alert.alert(err?.Error);
            Alert.alert(!!err.response.data ? err.response.data.message : err?.Error)
            dispatch(ApiCallErrorAction(err));
        })
    }
}

export const LoginSuccessAction = (payload: any) => {
    showToast("Olet nyt kirjautunut sisään onnistuneesti"); // You are now Successfully Logged In
    return { type: UserActionTypes.Login_Success_Action, payload: payload };
}

export const getTreeIdAction = () => {
    return (dispatch: any, getState: any) => {
        dispatch(ApiCallInitiateAction({
            loading: true,
            message: "Getting Tree Information.Please Wait ..."
        }))

        return getTreeId().then(async (response) => {
            console.log("get tree Id", response.data);
            console.log(Object.keys(response.data)[0]);
            dispatch(getTreeIdSuccessAction(Object.keys(response.data)[0]));
            dispatch(GetTreeDataAction(Object.keys(response.data)[0]));
        }).catch(err => {
            console.log("get tree id err", err);
            dispatch(ApiCallErrorAction(err.response))
        })
    }
}

export const getTreeIdSuccessAction = (payload:any) => {
    return { type: UserActionTypes.Get_TreeID_Success_Action, payload: payload}
}

export const GetTreeDataAction = (payload:any) => {
    return (dispatch: any, getState: any) => {
        console.log("get tree data action", payload);
        dispatch(ApiCallInitiateAction({
            loading: true,
            message: "Getting Data. Please wait..."
        }))

        return getTreeData(payload).then(async(response) => {
            console.log("get tree data", response.data);
            dispatch(GetTreeDataSuccesAction(response.data));
        }).catch(err => {
            console.log("get tree data",err);
            dispatch(ApiCallErrorAction(err));
        })
    }
}

export const GetTreeDataSuccesAction = (payload: any) => {
    return { type: UserActionTypes.Get_Tree_Data_Success_Action, payload: payload };
}

export const EventUpdateAction = (payload:any) => {
    console.log("event update action", payload);
    return (dispatch:any, getState:any) => {
        var eventName = payload.event.charAt(0).toUpperCase() + payload.event.slice(1, payload.event.length) + 'ing';
        dispatch(ApiCallInitiateAction({
            loading: true,
            message: `${eventName} the Event. Please Wait...`
        }))

        return updateEvent(payload).then(async(response) => {
            console.log("event update response", response.data);
            // showToast(response.data);
            dispatch(EventUpdateSuccesAction(response.data));
        }).catch(err => {
            console.log('error event update response', err, err.response.data.message);
            showToast(err.response.data.message);
            dispatch(ApiCallErrorAction(err.response))
        })
    }
}

export const EventUpdateSuccesAction = (payload:any) => {
    return { type:UserActionTypes.Event_Status_Update_Success_Action, payload: payload }
}

export const GetLastAttainedEventAction = () => {
    return (dispatch: any, getState: any) => {
        dispatch(ApiCallInitiateAction({
            loading: true,
            message: 'Checking your last attended Task. Please wait...'
        }))

        return getCurrentTaskID().then(async(response) => {
            console.log("get current task response", response.data);
            dispatch(GetLastAttainedEventSuccessAction(response.data))
        }).catch(err => {
            console.log('get current task response', err);
            dispatch(ApiCallErrorAction(err.response))
        })
    }
}

export const GetLastAttainedEventSuccessAction = (payload: any) => {
    return { type: UserActionTypes.Get_Last_Attained_Success_Event, payload: payload }
}

export const LogOutAction = () => {
    console.log("log out action",);
    // props.navigation.navigate('login');
    return { type: UserActionTypes.Logout_Action }
}