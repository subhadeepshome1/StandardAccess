import { StoreState } from "../../models/reduxModels";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LoadingState } from "../../models/loaderModels";
import { connect } from "react-redux";
import * as Progress from 'react-native-progress';

const SpinnerView = (props:any) => {

    const styles = StyleSheet.create({
        spinnerContainer: {
            position: 'absolute',
            left: 0,
            right: 0,
            zIndex: 999,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            alignItems: 'center',
            justifyContent: 'center',
        },
        loadingText: {
            fontSize: 20,
            color: '#D3FFF3',
        },
        paddingBottom: {
            paddingBottom: 10
        }
    })

    return (
        <>
            {props.loading == true ? (
                <View style={styles.spinnerContainer}>
                    <View style={styles.paddingBottom}>
                        <Progress.CircleSnail
                            indeterminate={true}
                            color={[ '#159ce6', ]}
                            size={120}
                            thickness={5}
                            animated={true}
                            direction="clockwise"
                        />
                    </View>
                    <Text style={styles.loadingText}>
                        {props.message}
                    </Text>
                </View>
            ) : (
                <></>
            )}
        </>
    );
};

const mapStatetoProps = (store:StoreState) => {
    return {
        loading: store.loading.loading,
        message: store.loading.message,
    }
}

export default connect(mapStatetoProps)(SpinnerView);