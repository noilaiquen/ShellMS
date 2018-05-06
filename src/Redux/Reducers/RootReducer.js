import { combineReducers } from 'redux';

import AppReducer from './AppReducer';
import AuthReducer from './AuthReducer';
import PlansReducer from './PlanReducer';
// import NavReducer from './NavReducer';

const RootReducer = combineReducers({
    AppState: AppReducer,
    AuthState: AuthReducer,
    PlanState: PlansReducer
    // NavReducer
});
export default RootReducer;
