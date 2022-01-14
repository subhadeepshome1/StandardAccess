import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoreState } from '../../models/reduxModels';
import React, { useEffect, useState } from 'react';
import { Text, View, Linking, StyleSheet, Image, Platform, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Header from '../../uiLibrary/Header';
import IconButton from '../../uiLibrary/IconButton';
import { LogOutAction } from '../../redux/actions/userActions';

const Info2ScreenView = (props:any) => {

    const [info2ScreenData, setInfo2ScreenData] = useState<any>();

    useEffect(() => {
        if(!!props.route.params) {
            console.log(props.route.params);
            setInfo2ScreenData(props.route.params);
        }
    }, [props.route.params])

    const callNumber = (phone:any) => {
        console.log('callNumber ----> ', phone);
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
          phoneNumber = `telprompt:${phone}`;
        }
        else  {
          phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
        .then(supported => {
          if (!supported) {
            Alert.alert('Phone number is not available');
          } else {
            return Linking.openURL(phoneNumber);
          }
        })
        .catch(err => console.log(err));
      };

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
        titleTextStyles: {
            fontSize: 24, 
            fontWeight: '700'
        },
        imgContainer: {
            width: '100%', 
            height: '55%', 
            marginVertical: 30, 
            borderRadius: 15, 
            borderWidth: 0.3, 
            borderColor: 'transparent', 
            alignItems: 'center',
            padding: 15
        },
        callImageButtonContainer: {
            height: '100%', 
            minWidth: '100%'
        },
        callButtonImgStyles: {
            height: '100%', 
            width: '100%', 
            borderColor: 'transparent', 
            borderWidth: 0.4, 
            borderRadius: 15
        },
        bottomButtonContainer: {
            flexDirection: 'row', 
            justifyContent: 'flex-end', 
            paddingHorizontal: 15, 
            paddingVertical: 15
        },
        noNumberFoundText: {
            fontSize: 18,
            fontWeight: '700', 
            textAlign: 'center',
            paddingVertical: 20
        }
    })

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
                    <View style={{alignItems: 'center'}}>
                        <View style={{padding: 15}}>
                            <Text style={styles.titleTextStyles}>{info2ScreenData?.title}</Text>
                        </View>
                        <View style={styles.imgContainer}>
                            { info2ScreenData?.fields?.field_puhelinnumero != '' ? (
                                <TouchableOpacity style={styles.callImageButtonContainer} onPress={() => callNumber(info2ScreenData?.fields?.field_puhelinnumero)}>
                                    <Image source={{uri: info2ScreenData?.fields?.field_additional_information_scr}} resizeMethod='scale' resizeMode='contain' style={styles.callButtonImgStyles} />
                                </TouchableOpacity>
                            ):(
                                <Text style={styles.noNumberFoundText}>
                                    Soittonumeroa ei löytynyt
                                </Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.bottomButtonContainer}>
                        <IconButton width={'25%'} borderColor='#25ad10' color='#25ad10' iconColor='white' iconName='md-arrow-forward-circle-sharp' iconSize={40} onPress={handleBackNavigation} roundness={5} title='' />
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

export default connect(mapStatetoProps, mapDispatchToProps)(Info2ScreenView);