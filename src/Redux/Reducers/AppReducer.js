
const initAppState = {
    isLoggedIn: false,
    appStart: true,
    userInfo: null
};

const AppReducer = (state = initAppState, action) => {
   switch (action.type) {
      case 'SET_INIT_SCREEN': {
         const { isLoggedIn } = action;
         return { ...state, appStart: false, isLoggedIn };
      }
      case 'GET_USER_INFO': {
         const { userInfo } = action;
         return { ...state, userInfo };
      }  
      default:    
         return state;
   }
};

export default AppReducer;

