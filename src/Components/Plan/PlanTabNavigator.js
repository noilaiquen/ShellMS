import React from 'react';
import { Image } from 'react-native';
import { TabNavigator } from 'react-navigation';
import PlanMap from './PlanMap';
import PlanSurveys from './PlanSurveys';
import PlanCamera from './PlanCamera';
import StoreUpdate from './StoreUpdate';

import CameraIcon from '../../Media/Icon/camera.png';
import EditIcon from '../../Media/Icon/edit.png';
import MapIcon from '../../Media/Icon/map.png';
import RefeshIcon from '../../Media/Icon/refesh.png';

import { appColor, appTextColor } from '../../Constants';

const RouteConfigs = {
    PlanMap: {
        screen: PlanMap,
        navigationOptions: {
            tabBarLabel: 'Check In',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={MapIcon}
                    style={{ width: 16, height: 16, tintColor }}
                />
            )
        }
    },
    PlanSurveys: {
        screen: PlanSurveys,
        navigationOptions: {
            tabBarLabel: 'Nhập liệu',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={EditIcon}
                    style={{ width: 16, height: 16, tintColor }}
                />
            )
        }
    },
    PlanCamera: {
        screen: PlanCamera,
        navigationOptions: {
            tabBarLabel: 'Chụp Hình',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={CameraIcon}
                    style={{ width: 16, height: 16, tintColor }}
                />
            )
        }
    },
    Tab4: {
        screen: StoreUpdate,
        navigationOptions: {
            tabBarLabel: 'Update',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={RefeshIcon}
                    style={{ width: 16, height: 16, tintColor }}
                />
            )
        }
    }
};

const TabNavigatorConfigs = {
    // initialRouteName: 'PlanSurveys',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
        showLabel: true,
        showIcon: true,
        upperCaseLabel: false,
        activeTintColor: appColor,
        inactiveTintColor: '#000',
        style: {
            backgroundColor: appTextColor,
            borderColor: '#E0E0E0',
            borderTopWidth: 0.2
        },
        indicatorStyle: {
            backgroundColor: appTextColor
        },
        labelStyle: {
            fontSize: 11,
            marginTop: 0,
            marginBottom: 0
        },
        tabStyle: {
        },
    }
};


export default TabNavigator(RouteConfigs, TabNavigatorConfigs);

