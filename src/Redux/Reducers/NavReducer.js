import { AppNavigator } from '../../Navigator/AppNavigator';

const NavReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

export default NavReducer;
