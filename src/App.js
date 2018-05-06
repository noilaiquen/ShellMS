import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import Main from './Components/Main';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}

export default App;
