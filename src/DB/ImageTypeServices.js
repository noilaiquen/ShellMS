import realm from './Realm';

const ImageTypeServices = {
    getAll: () => new Promise((resolve, reject) => {
        try {
            const ImageType = realm.objects('ImageType');
            resolve(Array.from(ImageType));
        } catch (e) {
            reject(` ${e}`);
        }
    }),
    insert: (imageType) => {
        try {
            realm.write(() => {
                realm.create('ImageType', {
                    typeId: Number(imageType.type_id),
                    typeName: imageType.type_name
                });
            });
        } catch (e) {
            console.log(` ${e}`);
        }
    },
    insertAll: (imageTypes) => new Promise((resolve, reject) => {
        try {
            imageTypes.forEach((imageType) => {
                ImageTypeServices.insert(imageType);
            });
            resolve();
        } catch (e) {
            reject(` ${e}`);
        }
    }),
    removeAll: () => new Promise((resolve, reject) => {
        try {
            realm.write(() => {
                const imageTypes = realm.objects('ImageType');
                realm.delete(imageTypes);
            });
            resolve();
        } catch (e) {
            reject(` ${e}`);
        }
    })
};

export default ImageTypeServices;
