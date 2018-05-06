import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppNavigator from '../Navigator/AppNavigator';
import StartScreen from './StartScreen';
import Login from './Login';
import { appStartAction } from '../Redux/Actions/AppActions'; 

class Main extends Component {
    componentDidMount() {
        this.props.appStartAction();
    }
    
    render() {
        const { isLoggedIn, appStart } = this.props;
        const InitScreen = isLoggedIn ? AppNavigator : Login;

        if (appStart) {
            return <StartScreen />;
        }
        return <InitScreen />;
    }
}

const mapStateToProps = ({ AppState }) => {
    const { isLoggedIn, appStart } = AppState;
    return {
        isLoggedIn,
        appStart
    };
};

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ appStartAction }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Main);

