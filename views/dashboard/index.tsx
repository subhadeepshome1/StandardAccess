import { StoreState } from '../../models/reduxModels';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, BackHandler } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';
import { GetTreeDataAction, getTreeIdAction, EventUpdateAction, GetLastAttainedEventAction, LogOutAction } from '../../redux/actions/userActions';
import moment from 'moment';
import IconButton from '../../uiLibrary/IconButton';
import { startPayload, snoozePayload } from '../../models/userModels';
import Header from '../../uiLibrary/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const DashboardView = (props: any) => {
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
            width: '90%', 
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
            fontSize: 21
        },
        infoTextStyles2: {
            fontWeight: 'bold',
            fontSize: 18,
            color: 'black'
        },
        timeNowContainer: {
            alignItems: 'center', 
            alignSelf: 'center',
            justifyContent: 'space-evenly',
            width: '98%', 
            height: '17%', 
            borderBottomColor: 'black', 
            borderBottomWidth: 0.6, 
            marginBottom: 5,
            // marginHorizontal: 4
        },
        currentTaskTimeContainer: {
            marginHorizontal: 2, 
            flexDirection: 'row', 
            justifyContent: 'space-evenly', 
            backgroundColor: '#DDFFDC', 
            paddingVertical: 5, 
            marginTop: 10
        },
        currentTaskContainer: {
            marginHorizontal: 11, 
            flexDirection: 'row', 
            flexWrap: 'wrap'
        },
        imgContainer: {
            height: '40%', 
            width: '88%', 
            justifyContent: 'center', 
            alignSelf: 'center', 
            marginVertical: 20
        },
        imgStyle: {
            height: '100%',
            width: '100%', 
            borderWidth: 0.4, 
            borderColor: 'transparent', 
            borderRadius: 15
        },
        bottomButtonsContainer: {
            flexDirection: 'row', 
            justifyContent: 'space-between',
            paddingBottom: 15,
            paddingHorizontal: 15
        }
    })

    useEffect(() => {
        console.log("userData from login:", props.userData);
        const saveUserData = async () => {
            try {
                console.log("saving userData");
                await AsyncStorage.setItem('userDetails',JSON.stringify(props.userData));
            } catch (err) {
                console.log(err);
            }
        }
        if (!!props.userData) {
            saveUserData();
            // props.navigation.replace('dashboard');
        }
    }, [props.userData])

    useEffect(() => {
        // props.GetTreeDataAction();
        props.getTreeIdAction();
        props.GetLastAttainedEventAction();
        PushNotification.cancelAllLocalNotifications();
    }, [])

    useEffect(() => {
        console.log("last_attended_node",props.last_attended_node);
    }, [props.last_attended_node])

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    const [mainEventData, setMainEventData] = useState<any>();
    const [calendarEventId, setCalendarEventId] = useState<any>();

    // useEffect(() => {
    //     if(!!calendarEventId) {
    //         let data: startPayload = {
    //             nid: calendarEventId,
    //             event: 'start'
    //         }
    //         props.EventUpdateAction(data);
    //     }
    // }, [calendarEventId])

    useEffect(() => {
        if(!!props.treeData) {
            // console.log(props.treeData?.tree_arr)
            var ParentEvent:any = Object.values(props.treeData?.tree_arr)[0];
            // console.log("parent event", ParentEvent);
            // console.log(Object.keys(ParentEvent));
            // console.log(Object.values(ParentEvent));
            var indxofchild = Object.keys(ParentEvent).findIndex(ele => ele == 'children');
            // console.log(Object.values(ParentEvent)[indxofchild]);
            var calendarEvent:any = Object.values(ParentEvent)[indxofchild];
            // console.log("calendarEvent",calendarEvent);
            setCalendarEventId(Object.keys(calendarEvent)[0])
            // console.log("child:",Object.values(calendarEvent)[0]);
            if(!!Object.values(calendarEvent)[0]) {
                setMainEventData(Object.values(calendarEvent)[0]);
            }
        }
    },[props.treeData])

    useEffect(() => {
        // console.log('mainEventdata', mainEventData);
        if(!!mainEventData && !!mainEventData.children) {
            console.log(Object.values(mainEventData.children), Object.keys(mainEventData.children), props.last_attended_node);
            if(!!props.last_attended_node && !!Object.keys(mainEventData.children).includes(props.last_attended_node)) {
                console.log("routing to node id", props.last_attended_node);
                props.navigation.navigate('subevent',mainEventData.children);
            }
        }
    },[mainEventData, props.last_attended_node]);

    const [nowTime, setNowTime] = useState<string>();

    useEffect(() => {
        const intervalID = setInterval(()=> {
            setNowTime(new Date().toLocaleString().slice(11,20))
        }, 1000)
    },[nowTime])

    const handleSnoozeNavigation = () => {
        let data: snoozePayload = {
            event: 'snooze',
            nid: calendarEventId
        }
        props.EventUpdateAction(data);
        props.navigation.navigate('snooze', mainEventData);
    }

    const handleProceedNavigation = () => {
        props.navigation.navigate('subevent', mainEventData.children);
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
                    <View>
                        <View style={styles.timeNowContainer}>
                            <Text style={styles.infoTextStyles2}>{mainEventData?.fields?.field_tr_time_is}</Text>
                            <Text style={styles.infoTextStyles}>{nowTime}</Text>
                        </View>
                        <View style={styles.currentTaskTimeContainer}>
                            <Text style={styles.infoTextStyles}>{mainEventData?.fields?.field_tr_event_time}:</Text>
                            <Text style={styles.infoTextStyles}>{moment(mainEventData?.fields?.field_date_and_time).format('hh:mm a DD-MM-yyyy')}</Text>
                        </View>
                        <View style={styles.currentTaskContainer}>
                            <Text style={[styles.infoTextStyles,{paddingVertical: 6}]}>{mainEventData?.fields?.field_tr_do_now}:</Text>
                            <Text style={styles.infoTextStyles}>{mainEventData?.title}</Text>
                        </View>
                        <View style={styles.imgContainer}>
                            <Image source={{uri: mainEventData?.fields?.field_kuva}} style={styles.imgStyle} />
                        </View>
                    </View>
                    <View style={styles.bottomButtonsContainer}>
                        <IconButton width={'25%'} borderColor='red' color='red' iconColor='white' iconName='md-close-circle-sharp' iconSize={40} onPress={handleSnoozeNavigation} roundness={5} title='' />
                        <IconButton width={'25%'} borderColor='#25ad10' color='#25ad10' iconColor='white' iconName='md-arrow-forward-circle-sharp' iconSize={40} onPress={handleProceedNavigation} roundness={5} title='' />
                    </View>
                </View>
            </View>
        </View>
    );
}

const mapStatetoProps = (store: StoreState) => {
    return {
        userData: store.user.userData,
        treeData: store.user.treeData,
        tree_id: store.user.tree_id,
        last_attended_node: store.user.last_attended_event
    }
}

const mapDispatchToProps = {
    GetTreeDataAction,
    getTreeIdAction,
    EventUpdateAction,
    GetLastAttainedEventAction,
    LogOutAction
};

export default connect(mapStatetoProps, mapDispatchToProps)(DashboardView);