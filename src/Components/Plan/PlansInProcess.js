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

class PlansInProcess extends Component {

    render() {
        const { isLoading, navigation, plansProcess } = this.props;
        const { Wrapper, PlanItemStyle, StoreIconStyle,
            IconStyle, PlanNameStyle, StoreInfoStyle,
            PLanInfoStyle, StoreAddressStyle } = Styles;

        if (isLoading) {
            return <ShowLoading />;
        }
        return (
            <View style={Wrapper}>
                <FlatList
                    data={plansProcess}
                    extraData={plansProcess} 
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
                                    storeAddress: item.storeAddress,
                                    storeLatitude: item.storeLatitude,
                                    storeLongitude: item.storeLongitude
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
    const { plansProcess, message, isLoading } = PlanState;
    return {
        plansProcess,
        message,
        isLoading
    };
};

export default connect(mapStateToProps)(PlansInProcess);

const Styles = StyleSheet.create({
    Wrapper: {
        flex: 1,
        backgroundColor: appTextColor
    },  
    PlanItemStyle: {
        flexDirection: 'row',
        height: height * 0.12,
        alignItems: 'center',
        paddingLeft: 5
    },
    PLanInfoStyle: {
        width: '100%',
        height: '100%',
        borderColor: '#E0E0E0',
        borderBottomWidth: 0.5,
        marginLeft: 10,
        justifyContent: 'center'
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
