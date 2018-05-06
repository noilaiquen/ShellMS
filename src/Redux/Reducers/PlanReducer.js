const initStatePlans = {
    plan: {},
    plans: [],
    plansProcess: [],
    plansDone: [],
    surveys: [],
    imageTypes: [],
    isLoading: false,
    isError: false,
    message: null
};

const PlansReducer = (state = initStatePlans, action) => {
    switch (action.type) {
        case 'FETCHING_PLANS_START': {
            return {
                ...state,
                isLoading: true,
                message: null
            };
        }
        case 'FETCHING_PLANS_SUCCESS': {
            const { plans, surveys, imageTypes, message } = action;
            return {
                ...state,
                plans,
                surveys,
                imageTypes,
                message,
                isLoading: false
            };
        }
        case 'FETCHING_PLANS_ERROR': {
            const { message } = action;
            return {
                ...state,
                isLoading: false,
                isError: true,
                message
            };
        }
        case 'GET_PLANS_LOCAL': {
            const { plans, surveys, imageTypes, message } = action;
            return {
                ...state,
                message,
                surveys,
                imageTypes,
                isLoading: false,
                plans: plans.filter(plan => plan.planStatus === 0),
                plansProcess: plans.filter(plan => plan.planStatus === 1),
                plansDone: plans.filter(plan => plan.planStatus === 2)
            };
        }    
        case 'CLEAR_PLAN_DATA': {
            return {
                state,
                plans: [],
                plansProcess: [],
                plansDone: [],
                surveys: [],
                imageTypes: [],
                isLoading: false,
                isError: false,
                message: null
            };
        }
        case 'ON_PROCESS_PLAN': {
            const { plan } = action;
            return {
                ...state,
                plan
            };
        }
        case 'UPDATE_PLAN_COORDS': {
            const { latitude, longitude } = action;
            const { plan } = state;

            if (Object.keys(plan).length > 0) {
                const newState = {
                    ...state,
                    plan: {
                        ...state.plan,
                        latCheckIn: latitude,
                        longCheckIn: longitude
                    }
                };
                return newState;
            }
            return state;
        }   
        default:
            return state;
    }
};

export default PlansReducer;
