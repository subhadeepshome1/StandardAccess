import { StoreState } from '../../models/reduxModels';
import React, { useEffect, useMemo, useState } from 'react';
import { BackHandler, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { EventUpdateAction, LogOutAction, GetLastAttainedEventAction } from '../../redux/actions/userActions';
import { endPayload, snoozePayload, startPayload } from '../../models/userModels';
import Ionicon from 'react-native-vector-icons/Ionicons';
import IconButton from '../../uiLibrary/IconButton';
import Header from '../../uiLibrary/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeAN from 'react-native-alarm-notification';

const SubEventView = (props:any) => {
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
            elevation: 4, 
            // padding: 15,
            borderWidth: 0.1, 
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
            color: '#858482',
            fontSize: 19
        },
        infoText2Styles: {
            fontWeight: 'bold',
            color: 'black',
            fontSize: 24
        },
        imgContainer: {
            height: '55%', 
            width: '100%', 
            marginVertical: 25, 
            borderRadius: 15, 
            borderWidth: 0.3, 
            borderColor: 'transparent', 
            alignItems: 'center'
        },
        imgStyle: {
            height: '100%',
            width: '100%', 
            borderWidth: 0.1, 
            borderColor: 'transparent', 
            borderRadius: 15,
        },
        bottomButton: {
            width: '30%',
        }
    })

    const [nowTime, setNowTime] = useState<string>();

    useEffect(() => {
        const intervalID = setInterval(()=> {
            setNowTime(new Date().toLocaleString().slice(11,20))
        }, 1000)
    },[nowTime]);

    const [thisSubEventData, SetThisSubeventData] = useState<any>();
    const [eventIds, setEventIds] = useState<any[]>([]);
    const [thisEventID, setThisEventID] = useState<any>();
    const [SubEvents, SetSubEvents] = useState<any[]>([]);

    useEffect(() => {
        props.GetLastAttainedEventAction();
    }, [])

    useEffect(() => {
        // console.log(props.route.params);
        console.log("filtered",Object.values(props.route.params).filter((ele:any) => ele.type == 'subevent'));
        console.log("filtered",Object.keys(props.route.params));
        SetSubEvents(Object.values(props.route.params).filter((ele:any) => ele.type == 'subevent'));
        setEventIds(Object.keys(props.route.params));
        SetThisSubeventData(Object.values(props.route.params)[0]);
        setThisEventID(Object.keys(props.route.params)[0]);
    }, [])

    const [flag, setFlag] = useState<boolean>(false);

    useEffect(() => {
        if(!!SubEvents && SubEvents.length > 0 && !!eventIds && eventIds.length > 0) {
            setFlag(true);
        }
    }, [SubEvents])

    useEffect(() => {
        console.log("last visioted page", props.last_visited_node_id);
        if(!!flag && flag === true) {
            if(!!props.last_visited_node_id && !!SubEvents && SubEvents.length > 0 && !!eventIds && eventIds.length > 0) {
                console.log("////",SubEvents,eventIds,eventIds.findIndex(ele => ele == props.last_visited_node_id));
                if(eventIds.findIndex(ele => ele == props.last_visited_node_id) > 0) {
                    console.log("((((", SubEvents.slice(eventIds.findIndex(ele => ele == props.last_visited_node_id)).filter((ele:any) => ele.type == 'subevent')); // subevents
                    console.log("))))", eventIds.slice(eventIds.findIndex(ele => ele == props.last_visited_node_id))); // eventids
                    SetSubEvents(SubEvents.slice(eventIds.findIndex(ele => ele == props.last_visited_node_id)).filter((ele:any) => ele.type == 'subevent'));
                    setEventIds(eventIds.slice(eventIds.findIndex(ele => ele == props.last_visited_node_id)));
                    SetThisSubeventData(SubEvents.slice(eventIds.findIndex(ele => ele == props.last_visited_node_id)).filter((ele:any) => ele.type == 'subevent')[0]);
                    setThisEventID(eventIds.slice(eventIds.findIndex(ele => ele == props.last_visited_node_id))[0]);
                }
            }
        }
    }, [props.last_visited_node_id, flag])

    // useEffect(() => {
    //     AsyncStorage.setItem('last visited page', 'subevent').then(() => console.log('last visited page successfully stored')).catch((err:any) => console.log('last visited page can`t be stored'))
    // }, [])

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    const [snoozeData, SetSnoozeData] = useState<any>();

    useEffect(() => {
        if(!!thisEventID) {
            if(+thisSubEventData?.fields?.field_delay_when_snoozed_in_seco > 0) {
                var SnoozeData:any = {
                    fields: thisSubEventData?.fields,
                    title: thisSubEventData?.title,
                    child: undefined
                }
                SetSnoozeData(SnoozeData);
            }
            // const params = new URLSearchParams();
            // params.append('nid', thisEventID);
            // params.append('event', 'start');
            // console.log("start api payload",params);
            // let data: startPayload = {
            //     event: 'start',
            //     nid: thisEventID
            // };
            // console.log("start payload",data);
            // props.EventUpdateAction(data);
        }
    }, [thisEventID])

    useEffect(() => {
        if(!!thisEventID) {
            let data: startPayload = {
                event: 'start',
                nid: thisEventID
            };
            console.log("start payload",data);
            props.EventUpdateAction(data);
        }
    }, [thisEventID])

    // useEffect(() => {
    //     // if(+thisSubEventData?.fields?.field_delay_when_snoozed_in_seco > 0) console.log("snooze data",snoozeData);
    // }, [snoozeData])

    useEffect(() => {
        return () => {
            SetThisSubeventData({});
            setEventIds([]);
            setThisEventID(null);
            setFlag(false);
            setNowTime(undefined);
            SetSnoozeData({});
            SetSubEvents([]);
        };
    }, [])

    const onPressNextSubEvent = () => {
        let restEvents = SubEvents.filter((ele:any) => ele != thisSubEventData);
        console.group(thisEventID);
        let restEventID = eventIds.filter((ele:any) => ele != thisEventID);
        console.log('rest event id', restEventID);

        let data: endPayload = {
            event: 'complete',
            nid: thisEventID
        };
        console.log("end event",data);
        props.EventUpdateAction(data);
        ReactNativeAN.removeAllFiredNotifications();
        ReactNativeAN.stopAlarmSound();

        if(restEvents.length < 1) {
            props.navigation.navigate('dashboard')
        } else {
            SetSubEvents(restEvents);
            setEventIds(restEventID);
            SetThisSubeventData(restEvents[0]);
            setThisEventID(restEventID[0]);
            console.log("rest array", restEvents, restEventID);
        }
    }

    const handleSnooze = () => {
        let data: snoozePayload = {
            event: 'snooze',
            nid: thisEventID
        };
        console.log('snooze event data', data);
        props.EventUpdateAction(data);
        props.navigation.navigate('snooze', snoozeData);
        ReactNativeAN.removeAllFiredNotifications();
        ReactNativeAN.stopAlarmSound();
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
                        <View style={{paddingBottom: 15}}>
                            <Text style={styles.infoTextStyles}>Aika now :</Text>
                            <Text style={styles.infoText2Styles}>{nowTime}</Text>
                        </View>
                        <View>
                            <Text style={styles.infoTextStyles}>Do now :</Text>
                            <Text style={styles.infoText2Styles}>{thisSubEventData?.title}</Text>
                        </View>
                        <View style={styles.imgContainer}>
                            <Image source={{uri: thisSubEventData?.fields?.field_image}} resizeMethod='resize' resizeMode='cover' style={styles.imgStyle} />
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding:15}}>
                        <View style={styles.bottomButton}>
                            {!!thisSubEventData?.fields?.field_delay_when_snoozed_in_seco && +thisSubEventData?.fields?.field_delay_when_snoozed_in_seco > 0 && (
                                <IconButton width={'95%'} borderColor='red' color='red' iconColor='white' iconName='md-close-circle-sharp' iconSize={40} onPress={handleSnooze} roundness={5} title='' />
                            )}
                        </View>
                        <View style={styles.bottomButton}>
                            <IconButton width={'95%'} borderColor='orange' color='orange' iconColor='white' iconName='md-information-circle' iconSize={40} onPress={() => props.navigation.navigate('info', thisSubEventData?.children)} roundness={5} title='' />
                        </View>
                        <View style={styles.bottomButton}>
                            <IconButton width={'95%'} borderColor='#25ad10' color='#25ad10' iconColor='white' iconName='md-arrow-forward-circle-sharp' iconSize={40} onPress={onPressNextSubEvent} roundness={5} title='' />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const mapStatetoProps = (store: StoreState) => {
    return {
        last_visited_node_id: store.user.last_attended_event
    }
}

const mapDispatchToProps = {
    EventUpdateAction,
    GetLastAttainedEventAction,
    LogOutAction
};

export default connect(mapStatetoProps, mapDispatchToProps)(SubEventView);