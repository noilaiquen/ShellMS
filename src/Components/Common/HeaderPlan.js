import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View, Dimensions,
    StyleSheet, TouchableOpacity,
    Image, Text
} from 'react-native';
import { appColor, appTextColor } from '../../Constants';

import BackIcon from '../../Media/Icon/back.png';
import UploadIcon from '../../Media/Icon/upload.png';
import StoreIcon from '../../Media/Icon/store.png';

const { height, width } = Dimensions.get('window');

class HeaderPlan extends Component {
    componentWillUnmount() {
    }

    render() {
        const { navigation, plan } = this.props;
        const {
            Wrapper, IconRight, IconLeft,
            Title, Header, StoreInfo, StoreIconStyle, Store, text
        } = Styles;

        return (
            <View style={Wrapper}>
                <View style={Header}>
                    <TouchableOpacity onPress={() => navigation.goBack(null)}>
                        <Image source={BackIcon} style={IconLeft} />
                    </TouchableOpacity>
    
                    <Text style={Title}>
                        {`${plan.planName} - ${plan.planRound}`}
                    </Text>
                
                    <TouchableOpacity onPress={() => console.log('object')}>
                        <Image source={UploadIcon} style={IconRight} />
                    </TouchableOpacity>
                </View>
    
                <View style={Store}>
                    <View style={StoreInfo}>
                        <Text style={text}>{`${plan.storeCode} - ${plan.storePhone}`}</Text>
                        <Text style={text}>{plan.storeAddress}</Text>
                    </View>
                    <Image source={StoreIcon} style={StoreIconStyle} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ PlanState }) => {
    const { plan } = PlanState;
    return {
        plan
    };
};
export default connect(mapStateToProps)(HeaderPlan);

const Styles = StyleSheet.create({
    Wrapper: {
        backgroundColor: appColor
    },
    Header: {
        height: height * 0.07,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15
    },
    IconLeft: {
        width: 28,
        height: 28,
        marginLeft: 15,
        tintColor: appTextColor
    },
    IconRight: {
        width: 28,
        height: 28,
        marginRight: 15,
        tintColor: appTextColor
    },
    Title: {
        color: appTextColor,
        fontSize: 16
    },
    text: {
        color: appTextColor,
        fontSize: 14
    },
    Store: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
    },
    StoreInfo: {
        width: width * 0.75,
        marginLeft: 10
    },
    StoreIconStyle: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    }
});
