import { LoginPayload } from '../../models/userModels';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Image, Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import Button from '../../uiLibrary/Button';
import TextField from '../../uiLibrary/TextInput';
import { requiredValidator } from '../../Validators/index';

const LoginView = ({submitAction}:loginProps) => {
    const styles = StyleSheet.create({
        imgContainer: {
            height: '35.5%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#5191FF'
        },
        img1: {
            minHeight: 250,
            maxWidth: 250
        },
    })

    const {register, control, handleSubmit, setValue, reset, watch, getValues, formState:{errors}, resetField} = useForm<LoginPayload>({
        mode: 'all'
    })

    const onSubmit = (data: LoginPayload) => {1
        submitAction(data);
        Keyboard.dismiss();
    }

    return (
        <ScrollView contentContainerStyle={{height: '100%'}} showsVerticalScrollIndicator={true} keyboardShouldPersistTaps='always'>
            <View style={{ flexDirection: 'column', flex: 100, justifyContent: 'space-between'}}>
                <View style={styles.imgContainer}>
                    <Image source={require('../../asset/Group8.png')} style={styles.img1} resizeMethod='scale' resizeMode='contain' />
                </View>
                <View style={{height: '70%', borderColor: 'transparent', borderWidth: 0.1, borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: 'white', bottom: '5.5%'}}>
                    <View style={{width: '80%', alignSelf: 'center', height: '70%', justifyContent: 'center'}}>  
                        <TextField placeholder={'Käyttäjänimi'} label={'Käyttäjänimi'} rules={{...requiredValidator}} control={control} refName={register('username')} name={'username'} errors={errors} />
                        <TextField placeholder={'Salasana'} label={'Salasana'} rules={{...requiredValidator}} secureTextEntry={true} control={control} refName={register('password')} name={'password'} errors={errors} />
                    </View>
                    <View style={{width: '65%', alignSelf: 'center', height: '30%', justifyContent: 'flex-start'}}>
                        <Button roundness={20} color={'#028528'} title={'KIRJAUDU SISÄÄN'} onPress={handleSubmit(onSubmit)} width={'100%'} disabled={!!errors.username || !!errors.password} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

interface loginProps {
    submitAction?: any;
}

export default LoginView;

