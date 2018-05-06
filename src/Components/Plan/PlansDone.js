import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View, Text,
    StyleSheet, FlatList, TouchableOpacity,
    Dimensions, Image
} from 'react-native';
import ShowLoading from '../Common/ShowLoading';
import { appColor, appTextColor } from '../../Constants';

import storeIcon from '../../Media/Icon/store.png';

const { height } = Dimensions.get('window');

class PlansDone extends Component {

    render() {
        const { isLoading, navigation, plansDone } = this.props;
        const { Wrapper, PlanItemStyle, StoreIconStyle,
            IconStyle, PlanNameStyle, StoreInfoStyle,
            PLanInfoStyle, StoreAddressStyle } = Styles;

        if (isLoading) {
            return <ShowLoading />;
        }
        return (
            <View style={Wrapper}>
                <FlatList
                    data={plansDone}
                    keyExtractor={(item) => item.planId}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={PlanItemStyle}
                            onPress={() => {
                                navigation.navigate('Plan', {
                                    planId: item.planId,
                                    planName: item.planName,
                                    planRound: item.planRound,
                                    storeCode: item.storeCode,
                                    storePhone: item.storePhone,
                                    storeAddress: item.storeAddress
                                });
                            }}
                        >
                            <View style={IconStyle}>
                                <Image source={storeIcon} style={StoreIconStyle} />
                            </View>
                            <View style={PLanInfoStyle}>
                                <Text style={PlanNameStyle}>{`${item.planName} - ${item.planRound}`}</Text>
                                <Text style={StoreInfoStyle}>{item.storeCode}</Text>
                                <Text style={StoreAddressStyle}>{item.storeAddress}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ PlanState }) => {
    const { plansDone, message, isLoading } = PlanState;
    return {
        plansDone,
        message,
        isLoading
    };
};

export default connect(mapStateToProps)(PlansDone);

const Styles = StyleSheet.create({
    Wrapper: {
        flex: 1,
        backgroundColor: '#ECEFF1'
    },
    PlanItemStyle: {
        flexDirection: 'row',
        height: height * 0.12,
        alignItems: 'center',
        backgroundColor: appTextColor,
        marginTop: 3,
        marginLeft: 5,
        marginRight: 5,
        elevation: 1.5
    },
    PLanInfoStyle: {
        marginLeft: 10
    },
    IconStyle: {
        height: 50,
        width: 50
    },
    StoreIconStyle: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    PlanNameStyle: {
        color: appColor
    },
    StoreInfoStyle: {
        color: '#6bb745'
    },
    StoreAddressStyle: {
        color: '#757575'
    }
});
