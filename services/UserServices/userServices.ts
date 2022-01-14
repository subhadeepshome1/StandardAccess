import axios from "axios";
import { LoginPayload, startPayload } from "../../models/userModels";
import { BASE_URL, CURRENT, GET_TREE_ID, LOGIN_URL, START, TREE } from "../../env";
import RestService from "../Rest";

export const serviceClient = new RestService({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection': 'keep-alive'
    },
})

export const LoginService = (data:any) => {
    console.log("from services", data);
    return serviceClient.post(BASE_URL+LOGIN_URL, data);
}

export const getTreeData = (tree_id: any) => {
    return serviceClient.getWithAccess(TREE+tree_id+'?mobile=1');
}

export const getTreeId = () => {
    return serviceClient.getWithAccess(GET_TREE_ID);
}

export const updateEvent = (payload: any) => {
    return serviceClient.postWithAccess(START, payload);
}

export const getCurrentTaskID = () => {
    return serviceClient.getWithAccess(CURRENT);
}