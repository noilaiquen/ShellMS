import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { appTextColor } from '../../Constants';

const TabBarLabel = (props) => {
    const { badgeText, labelText } = props;
    const { LabelFocused } = Styles;
    return (
        <View style={Styles.Wrapper}>
            <Text style={LabelFocused}>{labelText}({badgeText})</Text>
        </View>
    );
};
export default TabBarLabel;

const Styles = StyleSheet.create({
    Wrapper: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    LabelFocused: {
        color: appTextColor,
        fontSize: 12
    },
    // LabelUnFocused: {
    //     color: '#c0d6e4',
    //     fontSize: 12
    // }
});
