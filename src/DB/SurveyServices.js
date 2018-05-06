import realm from './Realm';

const SurveyServices = {
    getAll: () => new Promise((resolve, reject) => {
        try {
            const surveys = realm.objects('Survey');
            resolve(Array.from(surveys));
        } catch (e) {
            reject(` ${e}`);
        }
    }),
    insert: (survey) => {
        try {
            realm.write(() => {
                let surveyData = realm.create('Survey', {
                    surveyId: Number(survey.survey_id),
                    surveyName: survey.survey_name,
                    target: survey.survey_target_number ? Number(survey.survey_target_number) : 0,
                    inputType: survey.survey_input_type
                });
                if (survey.survey_input_source !== null) {
                    survey.survey_input_source.forEach(input_source => {
                        surveyData.inputSource.push({
                            label: input_source.label,
                            value: input_source.value.toString()
                        });
                    });
                }
            });
        } catch (e) {
            console.log(` ${e}`);
        }
    },
    insertAll: (surveys) => new Promise((resolve, reject) => {
        try {
            surveys.forEach(survey => {
                SurveyServices.insert(survey);
            });
            resolve();
        } catch (e) {
            reject(` ${e}`);
        }
    }),
    removeAll: () => new Promise((resolve, reject) => {
        try {
            realm.write(() => {
                const surveys = realm.objects('Survey');
                realm.delete(surveys);
            });
            resolve();
        } catch (e) {
            reject(` ${e}`);
        }
    })
};

export default SurveyServices;
