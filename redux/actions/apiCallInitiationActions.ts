import { LoadingPayload } from "../../models/loaderModels"

export enum ApiCallInitiateActions {
    Initiate_Api_Call = "[API_INITIATE] Initiate API Call Action",
    Api_Call_Error = "[API_INITIATE] Api Call Error Action",
    Api_Call_Success = "[API_INITIATE] Api Call SUccess Action",
}

export const ApiCallInitiateAction = (payload: LoadingPayload) => {
    return { type: ApiCallInitiateActions.Initiate_Api_Call, payload: payload };
}

export const ApiCallErrorAction = (payload: any) => {
    return { type: ApiCallInitiateActions.Api_Call_Error, payload: payload };
}

export const ApiCallSuccessAction = () => {
    return { type: ApiCallInitiateActions.Api_Call_Success };
}