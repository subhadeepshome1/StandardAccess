import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../../uiLibrary/IconButton';

const BottomNavigationButton = ({alignItems,flexDirection,justifyContent,onPressInfo,onPressProceed,onPressSnooze,snoozeData,thisSubEventData}:BottomNavigationButtonOptions) => {
    const styles = StyleSheet.create({
        buttonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    })

    return (
        <View style={styles.buttonContainer}>
            {!!thisSubEventData?.fields?.field_delay_when_snoozed_in_seco && +thisSubEventData?.fields?.field_delay_when_snoozed_in_seco > 0 && (
                // ()=>props.navigation.navigate('snooze', snoozeData)
                <IconButton width={'25%'} borderColor='red' color='red' iconColor='white' iconName='md-close-circle-sharp' iconSize={30} onPress={onPressSnooze} roundness={5} title='' />
            )}
            {/* () => props.navigation.navigate('info') */}
            <IconButton width={'25%'} borderColor='orange' color='orange' iconColor='white' iconName='md-information-circle' iconSize={30} onPress={onPressInfo} roundness={5} title='' />
            {/*  */}
            <IconButton width={'25%'} borderColor='green' color='green' iconColor='white' iconName='md-arrow-forward-circle-sharp' iconSize={30} onPress={onPressProceed} roundness={5} title='' />
        </View>
    );
}

interface BottomNavigationButtonOptions {
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    snoozeData: any;
    onPressSnooze: any;
    onPressInfo: any;
    onPressProceed: any;
    thisSubEventData: any;
}

export default BottomNavigationButton;