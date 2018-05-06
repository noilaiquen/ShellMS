import React, { Component } from 'react';
import {
    View, Text, Alert,
    StyleSheet, TouchableOpacity, Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapView from 'react-native-maps';
import { getPlansLocal, updatePlanCoordsAction } from '../../Redux/Actions/PlanActions';
// import PLanServices from '../../DB/PlanServices';
import { appColor, appTextColor } from '../../Constants';

const { width, height } = Dimensions.get('window');

class PlanMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markerCoords: null,
            region: null
        };
    }

    componentDidMount() {
        setTimeout(() => this.checkIn(), 1000);
    }

    checkIn() { 
        navigator.geolocation.getCurrentPosition( //eslint-disable-line
            (position) => {
                const { coords } = position;
                this.setState({
                    markerCoords: coords
                }, () => {
                    this._map.animateToRegion({ //eslint-disable-line
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        latitudeDelta: 0.010948229928487763,
                        longitudeDelta: 0.009123869240283966,
                    }, 1000);
                });
            }, (error) => {
                Alert.alert('Error!', error.message);
            }
        );
    }

    confirmCheckIn() {
        if (this.state.markerCoords === null) {
            return;
        }

        Alert.alert('',
            'Xác nhận check in tại vị trí này?',
            [
                { text: 'OK',
                    onPress: () => this.updatePlan()
                }, { text: 'Cancel' }
            ], { cancelable: false }
        );
    }

    updatePlan() {
        const { latitude, longitude } = this.state.markerCoords;
        this.props.updatePlanCoordsAction(latitude, longitude);
       /*  PLanServices.get(planId).then(plan => {
            const newPlan = {
                ...plan,
                latCheckIn: Number(latitude),
                longCheckIn: Number(longitude),
                planStatus: 1
            };
            PLanServices.update(newPlan).then(() => {
                this.props.getPlansLocal();
                this.props.navigation.navigate('PlanSurveys');
            }).catch((e) => {
                ToastAndroid.show('ERROR 103');
            });
        }).catch((e) => {
            ToastAndroid.show('ERROR 100');
        }); */
    }
    
    render() {
        const {
            container, map, ButtonCheckIn,
            text, coordsContainer, coordsText,
            AreaControl, ButtonConfirm
        } = Styles;
        const { markerCoords, region } = this.state;
        
        return (
            <View style={container}>
                <MapView  
                    ref={map => { this._map = map; }} //eslint-disable-line
                    style={map}
                    region={region}
                    onRegionChange={regionChange => this.setState({ region: regionChange })}
                    onRegionChangeComplete={(regionChange) => {
                        this.setState({ region: regionChange });
                        if (markerCoords) {
                            this.marker.showCallout();
                        }
                    }}
                >
                    {markerCoords &&
                        <MapView.Marker
                            ref={marker => { this.marker = marker; }}  
                            coordinate={markerCoords}
                            title={`${markerCoords.latitude}, ${markerCoords.longitude}`}
                            description={new Date().toLocaleString()}
                        />
                    }    
                </MapView>

                <View style={AreaControl}>
                    <TouchableOpacity style={ButtonConfirm} onPress={() => this.confirmCheckIn()}>
                        <Text style={text}>Đồng ý</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ButtonCheckIn} onPress={() => this.checkIn()} >
                        <Text style={text}>Check lại</Text>
                    </TouchableOpacity>
                </View>

                <View style={coordsContainer}>
                    <Text style={coordsText}>
                        {region && `${region.latitude}, ${region.longitude}`}
                    </Text>
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

const mapDispathToProps = (dispatch) => (
    bindActionCreators({ getPlansLocal, updatePlanCoordsAction }, dispatch)
);

export default connect(mapStateToProps, mapDispathToProps)(PlanMap);

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: appTextColor,
        width,
        height
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    ButtonCheckIn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.35,
        height: height * 0.07,
        backgroundColor: appColor,
        elevation: 0.5,
        borderRadius: 30,
        marginLeft: 10
    },
    ButtonConfirm: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.35,
        height: height * 0.07,
        backgroundColor: appColor,
        elevation: 0.5,
        borderRadius: 30,
        marginRight: 10
    },
    text: {
        color: appTextColor,
        fontSize: 18
    },
    coordsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 15,
        backgroundColor: '#FFF',
    },
    coordsText: {
        fontSize: 10,
        color: '#9E9E9E'
    },
    AreaControl: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: height * 0.1,
    }
});
