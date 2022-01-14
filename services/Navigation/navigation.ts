import { NavigationActions } from 'react-navigation';

let _navigator:any;

function setTopLevelNavigator(r:any) {
    _navigator = r;
}

function navigate(routename: any, params: any) {
    _navigator.dispatch(NavigationActions.navigate({
        routeName: routename,
        params: params
    }))
}

function back() {
    _navigator.dispatch(NavigationActions.back());
}

export default {
    navigate,
    setTopLevelNavigator,
    back
};