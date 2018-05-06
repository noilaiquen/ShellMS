import { AsyncStorage } from 'react-native';
import { API_URL, API_KEY, DEVICE_IMEI } from '../Constants';

export const getPlans = (userId) => (
    fetch(`${API_URL}get_plans_r`, { //eslint-disable-line
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imei: DEVICE_IMEI,
            api_key: API_KEY,
            userId,
        })
    }).then(res => res.json())
);

export const saveLocalPlans = async (plans) => {
    await AsyncStorage.setItem('@plans', JSON.stringify(plans));
};

export const clearPlans = async () => {
    await AsyncStorage.removeItem('@plans');
};

export const getLocalPlans = async () => {
    try {
        const plans = await AsyncStorage.getItem('@plans');
        if (plans !== null) {
            return JSON.parse(plans);
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const getPLanSurveys = (planId) => (
    fetch(`${API_URL}get_plans_r/surveys`, { //eslint-disable-line
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imei: DEVICE_IMEI,
            api_key: API_KEY,
            plan_id: planId,
        })
    }).then(res => res.json())
);

export const getImageTypes = () => (
    fetch(`${API_URL}get_plans_r/getImageTypes`, { //eslint-disable-line
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imei: DEVICE_IMEI,
            api_key: API_KEY
        })
    }).then(res => res.json())
);
