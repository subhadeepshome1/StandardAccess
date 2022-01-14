import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, ButtonProps } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';

const IconButton = ({color, width, onPress, iconName, roundness, borderColor, iconSize, iconColor, text}:CustomIconButtonProps) => {
    const styles = StyleSheet.create({
        buttonContainer: {
            width: width, 
            backgroundColor: color, 
            borderWidth: 0.3, 
            borderColor: borderColor, 
            borderRadius: roundness
        },
        buttonInner: {
            height: 50, 
            flexDirection: 'row',
            justifyContent: 'center', 
            alignItems: 'center'
        }
    });

    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <View style={styles.buttonInner}>
                <Ionicon name={iconName} color={iconColor} size={iconSize} />
                {!!text ? (
                    <Text style={{fontWeight: '700'}}>{text}</Text>
                ) : (
                    <></>
                )}
            </View>
        </TouchableOpacity>
    );
};

interface CustomIconButtonProps extends ButtonProps {
    roundness: number;
    color: string;
    borderColor: string;
    onPress: any;
    iconName: string;
    width: number|string;
    iconSize: number;
    iconColor: string;
    title: string;
    text?: string;
}
  
export default IconButton;