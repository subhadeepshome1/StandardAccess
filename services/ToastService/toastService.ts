import { Platform, ToastAndroid } from "react-native"
import SimpleToast from "react-native-simple-toast"

export const showToast = (msg: string) => {
    if(Platform.OS === 'android') {
        ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM)
    } else if(Platform.OS === 'ios') {
        SimpleToast.show(msg, SimpleToast.LONG)
    } else {
        return;
    }
}