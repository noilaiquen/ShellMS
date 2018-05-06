import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { appColor, appTextColor } from '../../Constants';
/* import PlanListIcon from '../../Media/Icon/plan_list.png';
import PlanProcessIcon from '../../Media/Icon/process.png';
import PlanDoneIcon from '../../Media/Icon/done.png'; */

const TabBarIcon = (props) => {
    const { tintColor, imageSource } = props;
    const { Wrapper, badgeText, text } = Styles;
    return (
        <View style={Wrapper}>
            <Image
                source={imageSource}
                style={{ width: 30, height: 30, tintColor }}
            />
            <View style={badgeText}>
                <Text style={text}>{2}</Text>
            </View>
        </View>
    );
};

export default TabBarIcon;

const Styles = StyleSheet.create({
    Wrapper: {
        flex: 1,
        zIndex: 0,
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    badgeText: {
        position: 'absolute',
        top: -5,
        right: 0,
        borderRadius: 10,
        backgroundColor: appTextColor,
        zIndex: 2,
    },
    text: {
        color: appColor,
        marginTop: 2,
        marginRight: 2,
        marginBottom: 2,
        marginLeft: 2,
        fontWeight: '600'
    }
});
