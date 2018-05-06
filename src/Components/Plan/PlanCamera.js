import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ScrollView,
    TouchableOpacity, Dimensions, Image,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import ShowLoading from '../Common/ShowLoading';
import { appColor, appTextColor } from '../../Constants';
import CameraIcon from '../../Media/Icon/camera.png';

const { width, height } = Dimensions.get('window');

class PlanCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageTypes: []
        };
    }

    componentDidMount() {
        const { imageTypes } = this.props;
        if (imageTypes.length > 0) {
            let newImageState = imageTypes.map(item => ({
                typeId: item.typeId,
                typeName: item.typeName,
                images: []
            }));

            this.setState({
                imageTypes: newImageState
            });
        }
    }

    chooseImage(typeId) {
        ImagePicker.launchCamera({ noData: true }, response => {
            if (response.didCancel) {
                console.log('Did Cancel!');
            } else if (response.error) {
                console.log('Image Picker Error:', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button:', response.customButton);
            } else {
                const currentImageState = [...this.state.imageTypes];                
                let newImageState = currentImageState.map(item => {
                    if (item.typeId === typeId) {
                        item.images.push({
                            uri: response.uri,
                            isStatic: true
                        });
                        return item;
                    }
                    return item;
                });
                this.setState({
                    ...this.state, imageTypes: newImageState
                });
            }
        }); 
    }

    renderItems(images) {
        const { imageItem, textEmptyImage } = Styles;
        // if (images.lenght > 0) {
            return images.map((item, index) => (
                <TouchableOpacity key={index}>
                    <Image source={item} style={imageItem} />
                </TouchableOpacity>
            ));
        // }
        // return <Text style={textEmptyImage}>No images!</Text>;
    }

    render() {
        const { Wrapper, iconCam, ImageZone,
            gridImage, imageTypeWrap, imageTypeHeader,
            imageTypeBody, textLabel
        } = Styles;
        const { imageTypes } = this.state;

        if (!imageTypes) {
            return <ShowLoading />;
        }

        return (
            <View style={Wrapper}>
                <View style={ImageZone}>
                    <FlatList
                        data={imageTypes}
                        keyExtractor={(item) => item.typeId}
                        renderItem={({ item }) => (
                            <View style={imageTypeWrap}>
                                <View style={imageTypeHeader}>
                                    <Text style={textLabel}>{item.typeName}</Text>
                                    <TouchableOpacity onPress={() => this.chooseImage(item.typeId)}>
                                        <Image source={CameraIcon} style={iconCam} />
                                    </TouchableOpacity>
                                </View>
                                <View style={imageTypeBody}>
                                    <ScrollView contentContainerStyle={gridImage}>
                                        {this.renderItems(item.images)}
                                    </ScrollView>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ PlanState }) => { //eslint-disable-line
    const { imageTypes, message } = PlanState;
    return {
        imageTypes,
        message
    };
};

export default connect(mapStateToProps)(PlanCamera);

const Styles = StyleSheet.create({
    Wrapper: {
        flex: 1,
        backgroundColor: appTextColor
    },
    ImageZone: {
        flex: 9
    },
    gridImage: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'space-around',
    },
    imageItem: {
        width: width * 0.3,
        height: width * 0.3,
        marginTop: width * 0.02,
        marginLeft: width * 0.018
    },
    controlZone: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    openCamera: {
        width: width * 0.2,
        height: height * 0.06,
        backgroundColor: appColor,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    iconCam: {
        width: 30,
        height: 30
    },
    imageTypeWrap: {
        flex: 1,
        backgroundColor: appTextColor,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
    },
    imageTypeHeader: {
        height: height * 0.06,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#78909C',
        paddingLeft: 10,
        paddingRight: 10
    },
    imageTypeBody: {
        flex: 5,
        paddingBottom: 5
    },
    textLabel: {
        color: appTextColor
    },
    textEmptyImage: {
        marginLeft: 5,
        color: '#ed1c24'
    }
});
