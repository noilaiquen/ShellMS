import { AsyncStorage } from 'react-native';
import { API_URL, API_KEY, DEVICE_IMEI } from '../Constants';

const signIn = (username, password) => (
    fetch(`${API_URL}login_r`, { //eslint-disable-line
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imei: DEVICE_IMEI,
            api_key: API_KEY,
            username,
            password
        })
    }).then(res => res.json())
);
exports.signIn = signIn;

const setUserLoggedIn = async (userInfo) => {
    await AsyncStorage.setItem('@userLoggedIn', JSON.stringify(userInfo));
};
exports.setUserLoggedIn = setUserLoggedIn;

const getUserLoggedIn = async () => {
    try {
        const userLoggedIn = await AsyncStorage.getItem('@userLoggedIn');
        if (userLoggedIn !== null) {
            return JSON.parse(userLoggedIn);
        }
        return null;
    } catch (error) {
        return null;
    }
};
exports.getUserLoggedIn = getUserLoggedIn;

export const signOut = async () => {
    await AsyncStorage.removeItem('@userLoggedIn');
};

