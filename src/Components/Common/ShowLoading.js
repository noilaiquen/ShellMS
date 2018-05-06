import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { appColor } from '../../Constants';

const ShowLoading = () => {
    const { Wrapper, centering, text } = Styles;
    return (
        <View style={Wrapper}>
            <ActivityIndicator
                animating
                color={appColor} 
                style={centering}
                size="large"
            />
            <Text style={text}>Loading...</Text>
        </View>
    );
};

export default ShowLoading;

const Styles = StyleSheet.create({
    Wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },
    text: {
        fontSize: 16,
        color: appColor
    }
});
