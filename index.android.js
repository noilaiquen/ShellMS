import {
    AppRegistry,
    StatusBar
} from 'react-native';
import App from './src/App';
import { appColor } from './src/Constants';

// StatusBar.setHidden(true); //Ẩn status bar
StatusBar.setBackgroundColor(appColor);
StatusBar.setTranslucent(false);

AppRegistry.registerComponent('ShellMS', () => App);
