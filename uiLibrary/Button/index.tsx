import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, ButtonProps } from "react-native";

const Button = (props:CustomButtonProps) => {
    const styles = StyleSheet.create({
        buttonContainer: {
            flexShrink: 1,
            width: props.width
        },
        rounded: {
            borderRadius: !!props.roundness ? props.roundness : 7
        },
        buttonColor: {
            backgroundColor: props.color
        },
        disabledButtonColor: {
            backgroundColor: 'gray'
        },
        button: {
            height: 42,
            flexShrink: 1,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonText: {
            color: 'white',
            fontSize: 22, 
            fontWeight: '700'
        }
    });

    return (
        <View style={[styles.buttonContainer,styles.rounded]}>
            {!props.disabled && (
                <TouchableOpacity
                    onPress={!props.disabled ? props.onPress : () => console.log('button disabled')} style={styles.rounded}>
                    <View style={[styles.button, styles.rounded, !props.disabled ? styles.buttonColor : styles.disabledButtonColor]}>
                        <Text style={styles.buttonText}>
                            {props.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
            {props.disabled && (
                <View style={styles.rounded}>
                    <View style={[styles.button, styles.disabledButtonColor, {borderRadius: !!props.roundness ? props.roundness : 7}]}>
                        <Text style={styles.buttonText}>
                            {props.title}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

interface CustomButtonProps extends ButtonProps {
    roundness?: number;
    color?: string;
    disabled?: boolean;
    onPress: any;
    title: string;
    width?: number|string;
}
  
export default Button;