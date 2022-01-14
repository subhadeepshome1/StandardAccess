import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../../uiLibrary/Button';
import PushNotification from 'react-native-push-notification';
import { useFocusEffect } from '@react-navigation/native';
import { connect } from 'react-redux';
import { StoreState } from '../../models/reduxModels';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TestScreens = (props: any) => {
    const [params, setParams] = useState('');

    useEffect(() => {
        setParams(props.route.params);
    },[])

    const [fcm_token, setFCMToken] = useState<any>();

    const getToken = async() => {
        const fcm_t = await AsyncStorage.getItem('fcm_token');
        setFCMToken(fcm_t);
        console.log("fcm", fcm_token);
    }

    useFocusEffect(
        React.useCallback(() => {
            getToken();
        }, [])
    );

    const styles = StyleSheet.create({
        container: {
            height: '100%', 
            alignItems: 'center', 
            flexDirection: 'column'
        },
        topPart: {
            height: '50%', 
            justifyContent: 'center'
        },
        topImg: {
            height: 300, 
            width: 300, 
            borderWidth: 0.6, 
            borderRadius: 150, 
            resizeMode: 'cover'
        },
        bottomPart: {
            height: '50%', 
            flexDirection: 'column', 
            justifyContent: 'space-between', 
            paddingVertical: 20
        },
        bottomTextpartContainer: {
            alignItems: 'center'
        },
        headerText: {
            fontSize: 35
        },
        subHeaderText: {
            fontSize: 20,
            paddingVertical: 10
        },
        bottomDoneText: {
            alignItems: 'center', 
            paddingBottom: 30
        }
    })
    // () => console.log("[DONE BUTTON PRESSED]")
    return (
        <View style={styles.container}>
            <View style={styles.topPart}>
                <Image source={require('../../asset/wakeup.jpg')} style={styles.topImg} />
            </View>
            <View style={styles.bottomPart}>
                <View style={styles.bottomTextpartContainer}>
                    <Text style={styles.headerText}> Wake Up </Text>
                    <Text style={styles.subHeaderText}> Please wake up! It's 7 AM </Text>
                </View>
                <View style={styles.bottomDoneText}>
                    <Button roundness={10} color={'blue'} title={'Done!'} onPress={() => {props.navigation.navigate('screen_2');PushNotification.cancelAllLocalNotifications()}} width={'100%'} disabled={false}/>
                </View>
            </View>
        </View>
    );
}

const mapStateToProps =(state:StoreState) => {
    return {

    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(TestScreens);