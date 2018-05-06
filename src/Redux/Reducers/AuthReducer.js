
const initState = {
    isLoading: false,
    userInfo: null,
    status: 0,
    isError: false,
    message: null
};

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCHING_SIGNIN':
            return { ...state, isLoading: true, message: null, isError: false }; 
            
        case 'FETCHING_SIGNIN_SUCCESS': {
            const { userInfo, message } = action;
            return {
                ...state,
                isLoading: false,
                userInfo,
                message
            };    
        }
            
        case 'FETCHING_SIGNIN_ERROR': {
            const { message } = action;
            return { ...state, isLoading: false, isError: true, message };
        }
            
        case 'USER_LOGOUT': {
            const { message } = action;
            return { ...state, userInfo: null, message };
        }
    
        default:
            return state;
    }
};
export default AuthReducer;
