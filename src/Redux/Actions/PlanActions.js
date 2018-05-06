import { ToastAndroid } from 'react-native';
import {
    getPlans,
    getPLanSurveys,
    getImageTypes
} from '../../Api/Plan';
import PLanServices from '../../DB/PlanServices';
import SurveyServices from '../../DB/SurveyServices';
import ImageTypeServices from '../../DB/ImageTypeServices';

const fetchPlansStartAction = () => ({
    type: 'FETCHING_PLANS_START'
});

const fetchPlansSuccessAction = (plans, surveys, imageTypes, message) => ({
    type: 'FETCHING_PLANS_SUCCESS',
    plans,
    surveys,
    imageTypes,
    message
});

const getPlansLocalAction = (plans, surveys, imageTypes, message) => ({
    type: 'GET_PLANS_LOCAL',
    plans,
    surveys,
    imageTypes,
    message
});

const fetchPlansErrorAction = (message) => ({
    type: 'FETCHING_PLANS_ERROR',
    message
});

const clearPlanDataAction = () => ({
    type: 'CLEAR_PLAN_DATA'
});

const onProcessPlanAction = (plan) => ({
    type: 'ON_PROCESS_PLAN',
    plan
});

export const updatePlanCoordsAction = (latitude, longitude) => ({
    type: 'UPDATE_PLAN_COORDS',
    latitude,
    longitude
});

export const updatePlanSurveyAction = (survey) => ({
    type: 'UPATE_PLAN_SURVEY',
    survey
});

export const clearPlan = (userId) => (
    (dispatch) => {
        dispatch(fetchPlansStartAction());
        Promise.all([
            PLanServices.removeAll(),
            SurveyServices.removeAll(),
            ImageTypeServices.removeAll()
        ]).then(() => {
            dispatch(clearPlanDataAction());
            fetchDataApiHelper(userId, dispatch);
        }).catch(e => {
            console.log(e);
            ToastAndroid.show('Lỗi', ToastAndroid.LONG);
        });
    }
);

const fetchDataApiHelper = (userId, dispatch) => (
    Promise.all([
        getPlans(userId),
        getPLanSurveys(),
        getImageTypes()
    ]).then(responses => {
        if (responses[0].status === 1 && responses[1].status === 1 && responses[2].status === 1) { //eslint-disable-line
            let datas = responses.map(response => (response.data)); //eslint-disable-line
            planDataInsertHelper(datas, dispatch);
        } else {
            dispatch(fetchPlansErrorAction('Get data not success!'));
        }
    }).catch(e => {
        dispatch(fetchPlansErrorAction(` ${e}`));
    })
);

const planDataInsertHelper = (datas, dispatch) => {
    Promise.all([
        PLanServices.insertAll(datas[0]), //response => undefined
        SurveyServices.insertAll(datas[1]), //response => undefined
        ImageTypeServices.insertAll(datas[2]), //response => undefined
        PLanServices.getAll(), //response => plan array
        SurveyServices.getAll(), //response => survey array
        ImageTypeServices.getAll(), //response => image type array
    ]).then((responses) => {
        dispatch(fetchPlansSuccessAction(responses[3], responses[4], responses[5], null));
        ToastAndroid.show('Success!', ToastAndroid.LONG);
    }).catch(e => {
        console.log(` ${e}`);
        dispatch(fetchPlansErrorAction(` ${e}`));
    });
};


export const getPlansLocal = () => (
    dispatch => {
        dispatch(fetchPlansStartAction());
        Promise.all([
            PLanServices.getAll(), //response => plan array
            SurveyServices.getAll(), //response => survey array
            ImageTypeServices.getAll(), //response => image type array
        ]).then(responses => {
            dispatch(getPlansLocalAction(responses[0], responses[1], responses[2], null));
        }).catch(() => {
            dispatch(fetchPlansErrorAction('ERROR 100'));
        });
    }
);

export const onProcessPlan = (navigate, plan) => (
    dispatch => {
        dispatch(onProcessPlanAction(plan));
        navigate('Plan');
    }
);
