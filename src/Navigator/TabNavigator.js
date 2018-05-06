import React from 'react';
import { TabNavigator } from 'react-navigation';

import PlanList from '../Components/Plan/PlanList';
import PlansInProcess from '../Components/Plan/PlansInProcess';
import PlansDone from '../Components/Plan/PlansDone';
import TabBarLabel from '../Components/Common/TabBarLabel';
import TabBarIcon from '../Components/Common/TabBarIcon';
import { appColor, appTextColor } from '../Constants';

import PlanListIcon from '../Media/Icon/plan_list.png';
import PlanProcessIcon from '../Media/Icon/process.png';
import PlanDoneIcon from '../Media/Icon/done.png';

const RouteConfigs = {
    PlanList: {
        screen: PlanList,
        navigationOptions: {
            tabBarLabel: (props) => <TabBarLabel badgeText={10} labelText="Chưa làm" {...props} />,
            tabBarIcon: (props) => <TabBarIcon {...props} imageSource={PlanListIcon} />
        }
    },
    InProcess: {
        screen: PlansInProcess,
        navigationOptions: {
            tabBarLabel: (props) => <TabBarLabel badgeText={3} labelText="Đang làm" {...props} />,
            tabBarIcon: (props) => <TabBarIcon {...props} imageSource={PlanProcessIcon} />
        }
    },
    Finish: {
        screen: PlansDone,
        navigationOptions: {
            tabBarLabel: (props) => <TabBarLabel badgeText={2} labelText="Đã làm" {...props} />,
            tabBarIcon: (props) => <TabBarIcon {...props} imageSource={PlanDoneIcon} />
        }
    }
};

const TabNavigatorConfigs = {
    // initialRouteName: 'InProcess',
    // tabBarPosition: 'bottom',
    tabBarOptions: {
        // showLabel: true,
        // showIcon: true,
        // upperCaseLabel: false,
        // activeTintColor: appColor,
        // inactiveTintColor: '#FFF',
        style: {
            backgroundColor: appColor,
        },
        indicatorStyle: {
            backgroundColor: appTextColor
        },
        labelStyle: {
            fontSize: 12,
            marginTop: 0,
            marginBottom: 0
        },
        tabStyle: {
        },
    }
};

export default TabNavigator(RouteConfigs, TabNavigatorConfigs);
