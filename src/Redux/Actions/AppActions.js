import { getUserLoggedIn } from '../../Api/Auth';

export const setInitScreen = (isLoggedIn) => ({
    type: 'SET_INIT_SCREEN',
    isLoggedIn
});

export const getUserInfoLocal = (userInfo) => ({
    type: 'GET_USER_INFO',
    userInfo
});

export const appStartAction = () => (
    (dispatch) => {
        getUserLoggedIn().then(userInfo => {
            const isLoggedIn = (userInfo !== null);
            dispatch(setInitScreen(isLoggedIn));
        });
    }
);

export const userLoggedIn = (isLoggedIn) => (
    (dispatch) => {
        dispatch(setInitScreen(isLoggedIn));
    }
);

export const getUserInfoLocalHandle = () => (
    (dispatch) => {
        getUserLoggedIn().then(userInfo => {
            dispatch(getUserInfoLocal(userInfo));
        });
    }
);

