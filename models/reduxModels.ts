import { LoadingState } from "./loaderModels";
import { UserState } from "./userModels";

export interface StoreState {
    user: UserState;
    loading: LoadingState
}