'use strict';
import Realm from 'realm';

class PlanSurvey extends Realm.Object { }
PlanSurvey.schema = {
    name: 'PlanSurvey',
    primaryKey: 'surveyId',
    properties: {
        surveyId: { type: 'int', indexed: true },
        surveyName: 'string',
        // question: 'string',
        answer: 'string',
        target: { type: 'float', default: 0 },
    }
};

class PlanImage extends Realm.Object { }
PlanImage.schema = {
    name: 'PlanImage',
    properties: {
        imageName: 'string',
        imagePath: 'string',
        imageSource: { type: 'data', default: null }
    }
};

class Plan extends Realm.Object { }
Plan.schema = {
    name: 'Plan',
    primaryKey: 'planId',
    properties: {
        planId: { type: 'int', indexed: true },
        planName: 'string',
        planRound: 'string',
        planStatus: { type: 'int', default: 0 },
        storeCode: 'string',
        storePhone: 'string',
        storeAddress: 'string',
        storeLatitude: { type: 'float', default: 0 },
        storeLongitude: { type: 'float', default: 0 },
        latCheckIn: { type: 'float', default: 0 },
        longCheckIn: { type: 'float', default: 0 },
        storeAddressUpdate: { type: 'string', default: '' },
        storePhoneUpdate: { type: 'string', default: '' },
        storeOwnerNameUpdate: { type: 'string', default: '' },
        storeNameUpdate: { type: 'string', default: '' }, 
        planImage: { type: 'list', objectType: 'PlanImage' },
        planSurvey: { type: 'list', objectType: 'PlanSurvey' }
    }
};

class InputSource extends Realm.Object { }
InputSource.schema = {
    name: 'InputSource',
    properties: {
        label: 'string',
        value: 'string'
    }
};

class Survey extends Realm.Object { }
Survey.schema = {
    name: 'Survey',
    primaryKey: 'surveyId',
    properties: {
        surveyId: { type: 'int', indexed: true },
        surveyName: 'string',
        target: { type: 'float', default: 0 },
        inputType: { type: 'string', default: 'text' },
        inputSource: { type: 'list', objectType: 'InputSource' }
    }
};

class ImageType extends Realm.Object { }
ImageType.schema = {
    name: 'ImageType',
    primaryKey: 'typeId',
    properties: {
        typeId: { type: 'int', indexed: true },
        typeName: 'string'
    }
};

export default new Realm({
    path: Realm.defaultPath,
    schema: [Plan, PlanImage, PlanSurvey, InputSource, Survey, ImageType],
    schemaVersion: 1
});
