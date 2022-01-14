import { StoreState } from '../../models/reduxModels';

const InitialState: StoreState = {
    user: {
        treeData: undefined,
        tree_id: undefined,
        userData: undefined
    },
    loading: {
        loading: false,
        message: ""
    }
};

export default InitialState;