import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import IconButton from '../../uiLibrary/IconButton';
import Header from '../../uiLibrary/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoreState } from '../../models/reduxModels';
import { connect } from 'react-redux';
import { LogOutAction } from '../../redux/actions/userActions';

const InfoScreenView = (props:any) => {

    const [infoScreenData, setInfoScreenData] = useState<any>();
    const [info2ScreenData, setInfo2ScreenData] = useState<any>();

    const styles = StyleSheet.create({
        container: {
            height: '100%',
            width: '100%',
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
        imgContainer: {
            width: '100%', 
            height: '55%', 
            marginVertical: 25, 
            borderRadius: 15, 
            borderWidth: 0.3, 
            borderColor: 'transparent', 
            alignItems: 'center'
        },
        imgStyles: {
            height: '100%', 
            width: '100%', 
            borderColor: 'transparent', 
            borderWidth: 0.4, 
            borderRadius: 15
        },
        titleTextStyles: {
            fontSize: 24, 
            fontWeight: '700'
        },
        bottomButtonContainer: {
            flexDirection: 'row', 
            justifyContent: 'space-between',
            paddingHorizontal: 15, 
            paddingVertical: 15
        },
        bottomButtonLeftContainer: {
            width: '33.33%',
        },
        bottomButtonMiddleContainer: {
            width: '33.33%',
            alignItems: 'center'
        },
        bottomButtonRightContainer: {
            width: '33.33%', 
            alignItems: 'center'
        }
    })

    useEffect(() => {
        setInfoScreenData(Object.values(props.route.params)[0]);
    }, []);

    useEffect(() => {
        if(!!infoScreenData?.children) {
            console.log(Object.values(infoScreenData?.children)[0]);
            setInfo2ScreenData(Object.values(infoScreenData?.children)[0])
        }
    }, [infoScreenData])

    const handleBackNavigation = () => {
        if(props.navigation.canGoBack()) {
            props.navigation.goBack();
        }
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
                    <View style={{alignItems: 'center', padding: 15}}>
                        <View>
                            <Text style={styles.titleTextStyles}>{infoScreenData?.title}</Text>
                        </View>
                        <View style={styles.imgContainer}>
                            <Image source={{uri: infoScreenData?.fields?.field_additional_information_pic}} resizeMethod='scale' resizeMode='cover' style={styles.imgStyles} />
                        </View>
                    </View>
                    <View style={styles.bottomButtonContainer}>
                        <View style={styles.bottomButtonLeftContainer} />
                        <View style={styles.bottomButtonMiddleContainer}>
                            {infoScreenData?.children != {} && (
                                <IconButton width={'78%'} borderColor='orange' color='orange' iconColor='white' iconName='md-information-circle' iconSize={40} onPress={()=>props.navigation.navigate('info2', info2ScreenData)} roundness={5} title='' />
                            )}
                        </View>
                        <View style={styles.bottomButtonRightContainer}>
                            <IconButton width={'78%'} borderColor='#25ad10' color='#25ad10' iconColor='white' iconName='md-arrow-forward-circle-sharp' iconSize={40} onPress={handleBackNavigation} roundness={5} title='' />
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

export default connect(mapStatetoProps, mapDispatchToProps)(InfoScreenView);