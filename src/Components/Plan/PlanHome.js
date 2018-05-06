import React, { Component } from 'react';
import {
    View, Text, Image,
    StyleSheet, TouchableOpacity, Dimensions
} from 'react-native';
import { appColor, appTextColor } from '../../Constants';
// import MapView from 'react-native-maps';

import CameraIcon from '../../Media/Icon/camera.png';
import EditIcon from '../../Media/Icon/edit.png';
import MapIcon from '../../Media/Icon/map.png';
import RefeshIcon from '../../Media/Icon/refesh.png';

const { width, height } = Dimensions.get('window');

class PlanHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            long: null,
            error: null
        };
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition( //eslint-disable-line
            (position) => {
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    error: null,
                });
            },
            (error) => {
                this.setState({ error: error.message });
            }
        );
    }

    render() {
        const { Wrapper, Box, Icon, Label, map } = Styles;
        return (
            <View style={Wrapper}>
                {/* <MapView
                    style={map}
                    initialRegion={{
                        latitude: 10.789114,
                        longitude: 106.699869,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                /> */}
                <TouchableOpacity style={Box} onPress={() => this.getLocation()}>
                    <Image source={MapIcon} style={Icon} />
                    <Text style={Label}>Check in</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Box}>
                    <Image source={CameraIcon} style={Icon} />
                    <Text style={Label}>Chụp hình</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Box}>
                    <Image source={EditIcon} style={Icon} />
                    <Text style={Label}>Nhập Liệu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Box}>
                    <Image source={RefeshIcon} style={Icon} />
                    <Text style={Label}>Update thông tin cửa hàng</Text>
                </TouchableOpacity>
                <Text>{this.state.lat}</Text>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    Wrapper: {
        flex: 1,
        backgroundColor: appTextColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Box: {
        width: width * 0.95,
        height: height * 0.09,
        backgroundColor: appColor,
        marginBottom: 5,
        borderRadius: 5,
        elevation: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Icon: {
        width: 28,
        height: 28,
        tintColor: appTextColor
    },
    Label: {
        color: appTextColor
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        width,
        height: 150
    },
});

export default PlanHome;
