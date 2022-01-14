import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconButton from "../../uiLibrary/IconButton";

const Header = ({logOutEvent, ...props}:HeaderProps) => {
    const styles = StyleSheet.create({
        topContainer: {
            height: '18%', 
            width: '99%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignSelf:'center'
        },
        headerText: {
            textAlign: 'left', 
            fontSize: 40, 
            fontWeight: '600'
        },
        topElevatedImgContainer: { 
            height: 65, 
            width: 65, 
            alignItems:'center', 
            justifyContent: 'center', 
            borderWidth: 0.5, 
            borderRadius: 10, 
            borderColor: 'transparent', 
            shadowColor: '#010101', 
            shadowOffset: { width: 1, height: 1 }, 
            shadowOpacity: 0.1, 
            shadowRadius: 15, 
            elevation: 2
        },
    })

    const handleLogout = () => {
        logOutEvent();
    }

    return (
        <View style={styles.topContainer}>
            <View style={{flexDirection: 'row', height: '100%', alignItems: 'flex-end', paddingBottom: 10, paddingLeft: 12}}>
                <Text style={styles.headerText}>Hei,</Text>
                <Text style={[styles.headerText, {fontWeight: 'bold'}]}> TestClient2</Text>
            </View>
            <View style={{height: '30%', flexDirection: 'row', width: '35%', position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'center'}}>
                {/* <TouchableOpacity style={styles.topElevatedImgContainer} onPress={handleLogout}>
                    <Image source={require('../../asset/arrowz.png')} />
                </TouchableOpacity> */}
                <IconButton width={'100%'} borderColor='white' color='transparent' iconColor='black' iconName='md-log-out-outline' iconSize={40} onPress={handleLogout} roundness={5} title='' text="Kirjautua ulos" />
            </View>
        </View>
    );
}

interface HeaderProps { 
    logOutEvent: any;
}

export default Header;