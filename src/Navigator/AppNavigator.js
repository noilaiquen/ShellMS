import React from 'react';
import {
    Image, TouchableOpacity
} from 'react-native';
// import { connect } from 'redux';
import { StackNavigator } from 'react-navigation';
import AppTab from './TabNavigator';
import Profile from '../Components/Profile';
import HeaderHome from '../Components/Common/HeaderHome';
import HeaderPlan from '../Components/Common/HeaderPlan';
// import PlanNavigator from '../Components/Plan/PlanNavigator';
import PlanTabNavigator from '../Components/Plan/PlanTabNavigator';
import { appColor, appTextColor } from '../Constants';

import RefeshIcon from '../Media/Icon/refesh.png';

const RouteConfigs = {
    Home: {
        screen: AppTab,
        navigationOptions: (props) => ({
            header: <HeaderHome {...props} title="Home" />
        })
    },
    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
            header: null,
            headerTitle: 'Profile',
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image source={RefeshIcon} style={{ width: 28, height: 28, marginRight: 10 }} />
                </TouchableOpacity>
            )
        })
    },
    Plan: {
        screen: PlanTabNavigator,
        navigationOptions: (props) => ({
            header: <HeaderPlan {...props} title="Plan" />
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
    },
    transitionConfig: () => ({
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;

            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [layout.initWidth, 0, 0]
            });

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
                outputRange: [0, 1, 1, 0.3, 0]
            });

            return { opacity, transform: [{ translateX }] };
        }
    })
};

const AppNavigator = StackNavigator(RouteConfigs, StackNavigatorConfigs);

/* console.log('-----------------------------');
const Action = AppNavigator.router.getActionForPathAndParams('Profile');
const State = AppNavigator.router.getStateForAction(Action);
const PathAndParams = AppNavigator.router.getPathAndParamsForState(State);
console.log(PathAndParams);
console.log('-----------------------------');
 */
export default AppNavigator;
