import { signIn, setUserLoggedIn, signOut } from '../../Api/Auth';
import { setInitScreen, userLoggedIn } from './AppActions';

const userSignIn = () => ({
    type: 'FETCHING_SIGNIN'
});

const userSignInSuccess = ({ data, message }) => ({
    type: 'FETCHING_SIGNIN_SUCCESS',
    userInfo: data,
    message
});

const userSignInError = (message) => ({
    type: 'FETCHING_SIGNIN_ERROR',
    message
});

export const userSignOut = () => ({
    type: 'USER_LOGOUT',
    message: 'Bạn đã đăng xuất!'
});

export const signInHandle = (username, password) => (
    (dispatch) => {
        dispatch(userSignIn());

        signIn(username, password).then(resJSON => {
            const { data, status, message } = resJSON;
            if (status === 1) {
                setUserLoggedIn(data).then(() => { //ghi AsyncStorage
                    dispatch(userSignInSuccess({ data, message })); //lưu vào store
                    dispatch(userLoggedIn(true)); //chuyển màn hình về home
                });
            } else {
                dispatch(userSignInError(message));
            }
        }).catch(() => {
            dispatch(userSignInError('ERROR!'));
        });
    }
);

export const SignOutHandle = () => (
    (dispatch) => {
        signOut().then(() => {
            dispatch(userSignOut()); //clear userInfo and set loginStatus = false in store
            dispatch(setInitScreen(false)); //change screen to login
        });
    }
);
