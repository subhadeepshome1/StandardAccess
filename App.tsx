import React, { useEffect } from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import ConfigureStore from './redux/configureStore';
import DashboardView from './views/dashboard';
import TestScreens from './views/test_screens';
import PushNotification from 'react-native-push-notification';
import TestScreens2 from './views/test_screens/screen_2';
import TestScreens3 from './views/test_screens/screen_3';
import { navigationRef } from './services/Navigation/NavigationRoot';
import Login from './views/login';
import SubEventView from './views/subeventScreen/subevent';
import SnoozeScreenView from './views/snoozeScreen/snoozeView';
import InfoScreenView from './views/infoScreen/infoScreenView';
import Info2ScreenView from './views/infoScreen/info2ScreenView';
import SpinnerView from './views/spinnerView';
import ReactNativeAN from 'react-native-alarm-notification';

const Stack = createStackNavigator();
const App = () => {

  const store = ConfigureStore();

  useEffect(() => {
    PushNotification.createChannel({
      channelId: 'fcm_fallback_notification_channel',
      channelName: 'Test Channel',
      channelDescription: 'A Test channel for testing Local Push notification',
      playSound: true,
      soundName: 'notification.mp3',
      importance: 4,
      vibrate: true,
    }, () => {console.log('push notification channel created')})
  }, [])

  useEffect(() => {
    // const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 1000));
    // const alarmNotifData = {
    //   title: "My Notification Title",
    //   message: "My Notification Message",
    //   channel: "fcm_fallback_notification_channel",
    //   small_icon: "ic_launcher",
    //   loop_sound: true,
    //   schedule_type: 'once',
    //   sound_name: 'notification.mp3',
    //   // vibrate: true,
    //   // vibration: 10000,
    //   volume: 1.0,
    //   has_button: true
    // }
    // const alarm = ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate }).then(() => console.log("alarm created successfully")).catch((err:any) => console.log("alrm creation err", err))
  }, [])

  return (
    <ReduxProvider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerTransparent: true, headerTitleStyle: {display: 'none'}, headerShown: false}} initialRouteName='login'>
          <Stack.Screen name='dashboard' component={DashboardView} />
          {/* <Stack.Screen name='screens' component={TestScreens} />
          <Stack.Screen name='screen_2' component={TestScreens2} />
          <Stack.Screen name='screen_3' component={TestScreens3} /> */}
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name='subevent' component={SubEventView} />
          <Stack.Screen name='snooze' component={SnoozeScreenView} />
          <Stack.Screen name='info' component={InfoScreenView} />
          <Stack.Screen name='info2' component={Info2ScreenView} />
        </Stack.Navigator>
        <SpinnerView />
      </NavigationContainer>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  }
});

export default App;