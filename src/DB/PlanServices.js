import realm from './Realm';

const PLanServices = {
    getAll: () => new Promise((resolve, reject) => {
        try {
            const plans = realm.objects('Plan');
            resolve(Array.from(plans));
        } catch (e) {
            reject(` ${e}`);
        }
    }), 
    get: (planId) => new Promise((resolve, reject) => {
        try {
            const plan = realm.objects('Plan').filtered(`planId = ${planId}`)[0];
            resolve(plan);
        } catch (e) {
            reject(` ${e}`);
        }
    }), 
    insert: (plan) => {
        try {
            realm.write(() => {
                realm.create('Plan', {
                    planId: Number(plan.plan_id),
                    planName: plan.plan_name,
                    planRound: plan.round_name,
                    storeCode: plan.store_code,
                    storePhone: plan.store_phone,
                    storeAddress: plan.store_address_raw,
                    storeLatitude: Number(plan.store_latitude),
                    storeLongitude: Number(plan.store_longitude)
                });
            });
        } catch (e) {
            console.log(` ${e}`);
        }
    },
    insertAll: (plans) => new Promise((resolve, reject) => {
        try {
            plans.forEach((plan) => {
                PLanServices.insert(plan);
            });
            resolve();
        } catch (e) {
            reject(` ${e}`);
        }
    }),
    update: (plan) => new Promise((resolve, reject) => {
        if (!plan || plan === undefined) {
            return;
        }

        try {
            realm.write(() => {
                realm.create('Plan', plan, true);
            });
            resolve();
        } catch (e) {
            reject(` ${e}`);
        }
    }),
    removeAll: () => new Promise((resolve, reject) => {
        try {
            realm.write(() => {
                const plans = realm.objects('Plan');
                realm.delete(plans);
            });
            resolve();
        } catch (e) {
            reject(` ${e}`);
        }
    })
};

export default PLanServices;
