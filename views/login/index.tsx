import { LoginPayload } from '../../models/userModels';
import React, { useEffect, useState } from 'react';
import LoginView from './LoginView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoreState } from '../../models/reduxModels';
import { LoginAction, LoginSuccessAction } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/core';

const Login = (props: any) => {

    const [fcm, setFCM] = useState<any>();

    const getFCM = async() =>{
        setFCM(await AsyncStorage.getItem('fcm_token'));
    }

    useFocusEffect(
        React.useCallback(() => {
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
                props.navigation.navigate('dashboard');
            }
        }, [props.userData])
    )

    useEffect(() => {
        console.log("userdata uuuu", props.userData)
    }, [props.userData])

    const checkLoginStatus = async() =>{
        const userDataStringified:any = await AsyncStorage.getItem('userDetails');
        const userData = JSON.parse(userDataStringified);
        console.log("in checkloginstatus", userData);
        if(!!userData) {
            props.LoginSuccessAction(userData);
            props.navigation.navigate('dashboard');
        }
    }

    useEffect(() => {
        checkLoginStatus();
    }, [])

    useEffect(() => {
        getFCM();
    }, [fcm])

    const onSubmit = (data: LoginPayload) => {
        const params = new URLSearchParams();
        params.append('client_id', '8c673e60-e8a1-4610-8bfb-c662d76776d8');
        params.append('client_secret', '123456');
        params.append('grant_type', 'password');
        params.append('fcm', fcm);
        params.append('username', data.username);
        params.append('password', data.password);
        console.log("login data", params);
        props.LoginAction(params,props);
    }

    return (
        <>
            <LoginView submitAction={onSubmit} />
        </>
    );
}

const mapStatetoProps = (store: StoreState) => {
    return {
        userData: store.user.userData,
    }
}

const mapDispatchToProps = {
    LoginAction,
    LoginSuccessAction
};

export default connect(mapStatetoProps, mapDispatchToProps)(Login);