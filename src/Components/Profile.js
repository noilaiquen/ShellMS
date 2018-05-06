import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    ScrollView, Dimensions, TouchableOpacity,
    Image
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SignOutHandle } from '../Redux/Actions/AuthActions';
import { getUserInfoLocalHandle } from '../Redux/Actions/AppActions';
import ShowLoading from '../Components/Common/ShowLoading';
import { appColor, appTextColor } from '../Constants';
import SignOutIcon from '../Media/Icon/signout.png';
import Cover from '../Media/Img/1.jpg';
import BackIcon from '../Media/Icon/back.png';
import RefeshIcon from '../Media/Icon/refesh.png';

const { width, height } = Dimensions.get('window');

class Profile extends Component {
    componentDidMount() {
        this.props.getUserInfoLocalHandle();
    }

    render() {
        const { Wrapper, Row, TextLabel, TextContent, ScrollStyle,
            ButtonLogout, TextLabelLogout, IconStyle, coverImage,
            Header, IconLeft, IconRight } = Styles;
        const { userInfo } = this.props;
        
        if (userInfo) {
            return (
                <HeaderImageScrollView
                    maxHeight={height * 0.4}
                    minHeight={height * 0.1}
                    maxOverlayOpacity={0.7}
                    renderHeader={() => (
                        <Image source={Cover} style={coverImage} />
                    )}
                    renderTouchableFixedForeground={() => (
                        <View style={Header}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image source={BackIcon} style={IconLeft} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={RefeshIcon} style={IconRight} />
                            </TouchableOpacity>
                        </View>
                    )}
                >
                <View style={Wrapper}>
                    <TriggeringView>
                        <ScrollView contentContainerStyle={ScrollStyle}>
                            <View style={Row}>
                                <Text style={TextLabel}>Username: </Text>
                                <Text style={TextContent}>{userInfo.username}</Text>
                            </View>
                            <View style={Row}>
                                <Text style={TextLabel}>Usercode: </Text>
                                <Text style={TextContent}>{userInfo.usercode}</Text>
                            </View>
                            <View style={Row}>
                                <Text style={TextLabel}>Fullname: </Text>
                                <Text style={TextContent}>{userInfo.fullname}</Text>
                            </View>
                            <View style={Row}>
                                <Text style={TextLabel}>Email: </Text>
                                <Text style={TextContent}>{userInfo.email}</Text>
                            </View>
                            <View style={Row}>
                                <Text style={TextLabel}>Phone name: </Text>
                                <Text style={TextContent}>{DeviceInfo.getDeviceName()}</Text>
                            </View>
                            <View style={Row}>
                                <Text style={TextLabel}>Brand: </Text>
                                <Text style={TextContent}>{DeviceInfo.getBrand()}</Text>
                            </View>
                            <View style={Row}>
                                <Text style={TextLabel}>Device Model: </Text>
                                <Text style={TextContent}>{DeviceInfo.getModel()}</Text>
                            </View>
                            <View style={Row}>
                                <Text style={TextLabel}>Timezone: </Text>
                                <Text style={TextContent}>{DeviceInfo.getTimezone()}</Text>
                            </View>
                            <View style={Row}>
                                <Text style={TextLabel}>Device ID: </Text>
                                <Text style={TextContent}>{DeviceInfo.getUniqueID()}</Text>
                            </View>
                            <TouchableOpacity style={ButtonLogout} onPress={() => this.props.SignOutHandle()}>
                                <Image source={SignOutIcon} style={IconStyle} />
                                <Text style={TextLabelLogout}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </TriggeringView>
                </View>
                </HeaderImageScrollView>
              );
        }

        return (
            <ShowLoading />
        );
    }
}

const mapStateToProps = ({ AppState }) => ({
    userInfo: AppState.userInfo
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ SignOutHandle, getUserInfoLocalHandle }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const Styles = StyleSheet.create({
    Wrapper: {
        flex: 1,
        backgroundColor: appTextColor,
    },
    ScrollStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    Row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width,
        height: height * 0.08,
        alignItems: 'center',
        paddingLeft: 5,
        borderColor: '#E0E0E0',
        borderBottomWidth: 0.5,
    },
    TextLabel: {
        fontSize: 16
    },
    TextContent: {
        fontSize: 15,
        paddingRight: 10,
        color: appColor
    },
    ButtonLogout: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.95,
        height: height * 0.08,
        backgroundColor: appColor,
        elevation: 0.5,
        paddingLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5
    },
    TextLabelLogout: {
        color: appTextColor,
        fontSize: 18
    },
    IconStyle: {
        tintColor: '#FFF',
        width: 30,
        height: 30,
        marginRight: 10
    },
    coverImage: {
        width,
        height: width,
        resizeMode: 'contain'
    },
    Header: {
        flexDirection: 'row',
        height: height * 0.07,
        width,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    IconLeft: {
        width: 28,
        height: 28,
        tintColor: appTextColor
    },
    IconRight: {
        width: 28,
        height: 28,
        tintColor: appTextColor
    },
});
