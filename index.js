/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import navigation from './services/Navigation/navigation';
import { NavigationActions } from 'react-navigation';
import BackgroundFetch from 'react-native-background-fetch';
import * as RootNavigation from './services/Navigation/NavigationRoot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeAN from 'react-native-alarm-notification';
LogBox.ignoreAllLogs(true);

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: async function(token) {
        console.log('TOKEN:', token)
        await AsyncStorage.setItem('fcm_token', token.token);
    },
    onNotification: function (notification) {
        console.log('[REMOTE_NOTIFICATION]', notification);
        const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 6000));
        const alarmNotifData = {
            title: "My Notification Title",
            message: "My Notification Message",
            channel: "fcm_fallback_notification_channel",
            small_icon: "ic_launcher",
            loop_sound: true,
            schedule_type: 'once',
            sound_name: 'notification.mp3',
            color: '#028528',
            repeat_interval: 'minutely',
            interval_value: 1,
            volume: 1.0,
            // has_button: true
        }
        const alarm = ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate }).then(() => console.log("alarm created successfully")).catch((err) => console.log("alrm creation err", err))
    },

    // ios specific config
    requestPermissions: Platform.OS === 'ios',
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: false,
});

const headless = () => {
    console.log('running in background fetch from index.js');
    BackgroundFetch.configure({
        enableHeadless: true,
        stopOnTerminate: false,
        minimumFetchInterval: 15
    }, 
        async task => {
            
            PushNotification.localNotificationSchedule({
                date: new Date(Date.now()+30000),
                channelId: "bYkUjk867",
                message: 'scheduled push at'+ ' ' +new Date(Date.now()+30000),
                title: 'Scheduled push',
                id: (Math.random()*100000).toFixed(0),
                largeIcon: 'ic_stat_accessibility_new',
                smallIcon: 'ic_stat_accessibility_new',
                vibrate: true,
                soundName: "default",
                color: 'green',
                playSound: true,
                repeatType: 'time',
                repeatTime: 30000
            })
        },
        error => {
            console.log('RNBackgroundFetch failed to start.', error);
        },
    )
}

BackgroundFetch.registerHeadlessTask(headless);
AppRegistry.registerComponent(appName, () => App);