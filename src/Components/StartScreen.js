import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import logo from '../Media/Img/logo-cpm.png';

const { width } = Dimensions.get('window');

const StartScreen = () => {
    const { Wrapper, Logo } = Styles;
    return (
        <View style={Wrapper}>
            <Image source={logo} style={Logo} />
        </View>
    );
};

export default StartScreen;

const Styles = StyleSheet.create({
    Wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    Logo: {
        width: width * 0.8,
        resizeMode: 'contain',
    }
});
