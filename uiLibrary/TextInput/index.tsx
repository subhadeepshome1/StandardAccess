import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

const TextField = ({
    name,
    rules,
    control,
    defaultValue,
    errors,
    refName,
    autoCompleteType,
    autoCapitalize,
    refCopy,
    nextRef,
    submitAction,
    label,
    labelColor,
    secureTextEntry,
    placeholder,
    slim,
    editable,
    focusable,
    ...props
}: CustomTextInputProps) => {
    
    const styles = StyleSheet.create({
        input: {
            borderRadius: 5,
            borderWidth: !errors[name] ? 0.4 : 2,
            borderColor: !errors[name]
              ? '#d9d9d9'
              : '#ff5714',
            borderStyle: 'solid',
            width: '100%',
            backgroundColor: '#ffffff',
            color:'black',
            paddingLeft: 15,
            paddingRight: 15,
            fontSize: 16,
            paddingVertical: !!slim ? 2 : 10,
        },
        error: {
            // fontSize: 12,
            color: '#ff5714',
        },
        label: {
            color: !!labelColor ? labelColor : '#17A4F1',
            paddingBottom: !!slim ? 0 : 5,
            fontSize: 18,
        },
        textInputStyles: { 
            borderBottomColor: '#bdb7b6', 
            borderBottomWidth: 0.8, 
            // letterSpacing: letterSpacing!= undefined ? 1 : letterSpacing 
        },
        paddingVertical: {
            paddingVertical: 5
        }
    })

    return (
        <Controller 
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value } }) => (
                <View>
                    <Text style={{paddingVertical: 10, fontSize: 16}}> {label} </Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder={placeholder} 
                        secureTextEntry={secureTextEntry}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        // value={value}
                        ref={!!refCopy ? (e) => {refName(e);refCopy(e)}:refName}
                        // autoComplete={"off"}
                        autoCapitalize="none"
                        editable={editable}
                        focusable={focusable}
                        onSubmitEditing={() => {
                            if(!!nextRef) {
                                nextRef.focus();
                            } else if(!!submitAction) {
                                submitAction()
                            }
                        }}
                        {...props}
                    />
                    <Text
                        style={[!!errors[name] ? styles.error : {display: 'none'}, styles.paddingVertical]}>
                        {!!errors[name] && '* ' + errors[name].message.toString()}
                    </Text>
                </View>
            )}
        />
    );
}

interface CustomTextInputProps extends TextInputProps {
    name: any;
    rules?: any;
    control: any;
    defaultValue?: any;
    errors?: any;
    refName: any;
    refCopy?: any;
    nextRef?: any;
    submitAction?: any;
    label?: string;
    labelColor?: string;
    slim?: boolean;
    secureTextEntry?: boolean;
    editable?: boolean;
    focusable?: boolean;
}

export default TextField;