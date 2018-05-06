import React from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PlanHome from './PlanHome';

import { appColor, appTextColor } from '../../Constants';
import BackIcon from '../../Media/Icon/back.png';

const RouteConfigs = {
    PlanHome: {
        screen: PlanHome,
        navigationOptions: ({ navigation }) => ({
            headerTitle: `${navigation.state.params.plan.plan_name} - ${navigation.state.params.plan.round_name}`, //eslint-disable-line
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack(null)}>
                    <Image
                        source={BackIcon}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: appTextColor,
                            marginLeft: 15,
                        }}
                    />
                </TouchableOpacity>
            )
        })
    },
    Test: {
        screen: () => (<Text>dads</Text>),
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'Test',
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={BackIcon}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: appTextColor,
                            marginLeft: 15,
                        }}
                    />
                </TouchableOpacity>
            )
        })
    }
};

const StackNavigatorConfigs = {
    navigationOptions: {
        headerTintColor: appTextColor,
        headerStyle: {
            backgroundColor: appColor,
            elevation: 0.5
        },
        headerTitleStyle: {
            fontWeight: '100',
            fontSize: 16
        }
    }
};


export default StackNavigator(RouteConfigs, StackNavigatorConfigs);

