import React, { Component } from 'react';
import {
    View, Dimensions,
    StyleSheet, TextInput, TouchableOpacity,
    Image, Alert
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PlanActions from '../../Redux/Actions/PlanActions';
import { appColor, appTextColor, boxSearch } from '../../Constants';

import ProfileIcon from '../../Media/Icon/profile.png';
import RefeshIcon from '../../Media/Icon/refesh.png';
import SearchIcon from '../../Media/Icon/search.png';

const { height, width } = Dimensions.get('window');

class HeaderHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onFocusSearch: false,
            textSearch: ''
        };
    }

    reloadPlans() {
        const { clearPlan } = this.props;
        Alert.alert('',
            'Bạn có chắc muốn xóa plan và tải lại?',    
            [
                {
                    text: 'OK',
                    onPress: () => {
                        clearPlan();
                    }
                },
                {
                    text: 'Cancel',
                }
            ],
            { cancelable: false });
    }

    render() {
        const { navigation } = this.props;
        const { onFocusSearch, textSearch } = this.state;
        const {
            Wrapper, InputSeacrch, IconRight,
            IconLeft, InputSeacrchFocus
        } = Styles;
        const isSearch = (onFocusSearch || textSearch !== '') ? true : false;

        return (
            <View style={Wrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={ProfileIcon} style={IconLeft} />
                </TouchableOpacity>

                <TextInput
                    placeholder={!isSearch ? 'Search...' : null}
                    style={isSearch ? InputSeacrchFocus : InputSeacrch}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={appTextColor}
                    value={textSearch}
                    onFocus={() => {
                        this.setState({
                            onFocusSearch: true
                        });
                    }}
                    onEndEditing={() => {
                        this.setState({
                            onFocusSearch: false
                        });
                    }}
                    onChangeText={text => {
                        this.setState({
                            textSearch: text
                        });
                    }}
                />
                {!isSearch ? (
                    <TouchableOpacity onPress={this.reloadPlans.bind(this, 123)}>
                        <Image source={RefeshIcon} style={IconRight} />
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                            <Image source={SearchIcon} style={IconRight} />
                        </TouchableOpacity>
                    )
                }
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators(PlanActions, dispatch)
);

export default connect(null, mapDispatchToProps)(HeaderHome);

const Styles = StyleSheet.create({
    Wrapper: {
        height: height * 0.07,
        backgroundColor: appColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    InputSeacrch: {
        height: height * 0.05,
        width: width * 0.7,
        color: appTextColor,
        fontSize: 13,
        paddingTop: 0,
        paddingBottom: 0,
    },
    InputSeacrchFocus: {
        width: width * 0.7,
        color: appTextColor,
        height: height * 0.05,
        fontSize: 14,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: boxSearch,
        borderBottomWidth: 0.5,
        borderRadius: 15
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
    }
});
