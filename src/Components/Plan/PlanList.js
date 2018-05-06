import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View, Text,
    StyleSheet, FlatList, TouchableOpacity,
    Dimensions, Image, ToastAndroid
} from 'react-native';
import ShowLoading from '../Common/ShowLoading';
import { getPlansLocal, onProcessPlan } from '../../Redux/Actions/PlanActions';
import { appColor, appTextColor } from '../../Constants';

import storeIcon from '../../Media/Icon/store.png';

const { height } = Dimensions.get('window');

class PlanList extends Component {
    componentDidMount() {
        this.props.getPlansLocal();
    }

    componentWillReceiveProps({ message }) {
        if (message !== null) {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    render() {
        const { isLoading, navigation, plans } = this.props;
        const { Wrapper, PlanItemStyle, StoreIconStyle,
            IconStyle, PlanNameStyle, StoreInfoStyle,
            PLanInfoStyle, StoreAddressStyle } = Styles;

        if (isLoading) {
            return <ShowLoading />;
        }
        
        return (
            <View style={Wrapper}>
                <FlatList
                    data={plans}
                    extraData={plans} 
                    keyExtractor={(item) => item.planId}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={PlanItemStyle}
                            onPress={() => this.props.onProcessPlan(navigation.navigate, item)}
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
    const { plans, message, isLoading } = PlanState;
    return {
        plans,
        message,
        isLoading
    };
};

const mappDispatchToProps = (dispatch) => (
    bindActionCreators({ getPlansLocal, onProcessPlan }, dispatch)
);

export default connect(mapStateToProps, mappDispatchToProps)(PlanList);

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
