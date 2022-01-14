import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconButton from '../../uiLibrary/IconButton';
import Header from '../../uiLibrary/Header/index';
import { StoreState } from '../../models/reduxModels';
import { LogOutAction } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeAN from 'react-native-alarm-notification';

const SnoozeScreenView = (props:any) => {
    const styles = StyleSheet.create({
        container: {
            height: '100%',
            width: '100%',
            // alignItems: 'center',
            // justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: 'white'
        },
        topContainer: {
            height: '10%', 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            paddingHorizontal: 15
        },
        headerText: {
            textAlign: 'left', 
            fontSize: 20, 
            fontWeight: 'bold'
        },
        topElevatedImgContainer: { 
            height: '75%', 
            width: 60, 
            alignItems:'center', 
            justifyContent: 'center', 
            borderWidth: 0.5, 
            borderRadius: 10, 
            borderColor: 'transparent', 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 0 }, 
            shadowOpacity: 0.1, 
            shadowRadius: 15, 
            elevation: 2
        },
        bottomContainer: {
            height: '80%', 
            alignItems: 'center'
        },
        bottomElevatedView: {
            height: '98%', 
            width: '93%', 
            elevation: 2, 
            // padding: 15, 
            borderWidth: 0.5, 
            borderColor: 'transparent', 
            borderRadius: 15, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.1, 
            shadowRadius: 1, 
            justifyContent: 'space-between'
        },
        infoTextStyles: {
            fontWeight: 'bold',
            color: 'black',
            fontSize: 24
        },
        buttoncontainerStart: {
            width: '50%', 
            justifyContent: 'flex-start'
        },
        buttonContainerEnd: {
            width: '50%',
            alignItems: 'flex-end',
        },
        buttonStyles: {
            width: '40%',
            padding: 10, 
            borderWidth: 0.4, 
            borderColor: 'green', 
            borderRadius: 10, 
            backgroundColor: 'green'
        },
        buttonTextStyles: {
            textAlign: 'center', 
            fontSize: 16, 
            fontWeight: 'bold', 
            color: 'white'
        }
    })

    useEffect(() => {
        console.log("snozedata params",props.route.params)
    }, [])

    const [timerCount, setTimer] = useState(!!props.route.params.fields?.field_delay_when_snoozed_in_seco ? props.route.params.fields?.field_delay_when_snoozed_in_seco : props.route.params.fields?.field_delay_when_snoozed_in_seco)

    useEffect(() => {
    let interval = setInterval(() => {
        setTimer((lastTimerCount:any) => {
            lastTimerCount <= 1 && clearInterval(interval)
            return lastTimerCount - 1;
        })
    }, 1000) //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval)
    }, []);

    // useEffect(() => {
    //     console.log(timerCount);
    //     if(timerCount == 0 ) {
    //         if(props.navigation.canGoBack()) {
    //             props.navigation.goBack()
    //         }
    //     }
    // },[timerCount])

    const handleBackNavigation = () => {
        if(props.navigation.canGoBack()) {
            props.navigation.goBack();
            ReactNativeAN.removeAllFiredNotifications();
            ReactNativeAN.stopAlarmSound();
        }
    }

    const handleInfoNavigation = () => {
        props.navigation.navigate('info');
    }

    const logOut = () => { 
        AsyncStorage.removeItem('userDetails').then(() => {
            props.LogOutAction();
            props.navigation.navigate('login');
        }).catch((err:any) => {
            console.log('err in deleting userData', err);
        })
    }

    return (
        <View style={styles.container}>
            <Header logOutEvent={logOut} />
            <View style={styles.bottomContainer}>
                <View style={styles.bottomElevatedView}>
                    <View style={{padding: 15}}>
                        <Text style={styles.infoTextStyles}>{props.route.params.title}</Text>
                    </View>
                    <View style={{padding: 15}}>
                        {timerCount > 0 ? (
                            <Text style={[styles.infoTextStyles, {textAlign: 'center'}]}>{!!props.route.params.fields?.field_tr_postponed_for ? props.route.params.fields?.field_tr_postponed_for :'Tehtävää lykätty'} {timerCount} sekuntia</Text>
                        ) : (
                            <Text style={[styles.infoTextStyles, {textAlign: 'center'}]}>{!!props.route.params.fields?.field_tr_postponed_for ? props.route.params.fields?.field_tr_postponed_for :'Tehtävää lykätty'} klikkaa vihreää</Text>
                        )}
                    </View>
                    <View style={{flexDirection:'row', padding: 15}}>
                        <View style={styles.buttoncontainerStart}>
                            {/* <IconButton width={'55%'} borderColor='orange' color='orange' iconColor='white' iconName='md-information-circle' iconSize={40} onPress={handleInfoNavigation} roundness={5} title='' /> */}
                        </View>
                         <View style={styles.buttonContainerEnd}>
                            {timerCount <= 0 && (
                                <IconButton width={'55%'} borderColor='#25ad10' color='#25ad10' iconColor='white' iconName='md-arrow-forward-circle-sharp' iconSize={40} onPress={handleBackNavigation} roundness={5} title='' />
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const mapStatetoProps = (store: StoreState) => {
    return {
        
    }
}

const mapDispatchToProps = {
    LogOutAction
};

export default connect(mapStatetoProps, mapDispatchToProps)(SnoozeScreenView);