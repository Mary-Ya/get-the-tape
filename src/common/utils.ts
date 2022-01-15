import { ITrack } from "@interfaces/track";
import SafeStorage from "./safe-storage";

const DEFAULT_MAX_RANDOM_NUMBER = 1000;
const getRandomNumber = (max = 1000) => Math.floor(Math.random() * max)

const returnBody = (i: any) => {
    return i.data.body;
};

const safeLocalStorage = new SafeStorage('localStorage');
const safeSessionStorage = new SafeStorage('sessionStorage');

const errorHandler = (e: any) => {
    console.log(e);
};

const haveACopyInArray = (item: any, array: Array<any>) => (array.findIndex((i: ITrack) => {
    return i.id === item?.id;
}) !== -1);

const clearSelectedValue = (selectorRef: any) => {
    selectorRef.current?.select?.select?.clearValue();
}

// to remove properties with falsy values
const cleanObject = (data: any) => {
    let cleanData = { ...data };
    Object.keys(cleanData).forEach((key) => {
        if (!cleanData[key]) {
            delete cleanData[key];
        }
    });

    return cleanData;
}

const deserialize = (search: string) =>
    Object.fromEntries(new URLSearchParams(search));

    
const removeItemByProperty = (data: any[], filter: any, propName: string) => {
    return data.filter((i) => i[propName] !== filter);
};

export {
    DEFAULT_MAX_RANDOM_NUMBER,
    getRandomNumber,
    safeLocalStorage,
    safeSessionStorage,
    errorHandler,
    returnBody,
    clearSelectedValue,
    haveACopyInArray,
    cleanObject,
    deserialize,
    removeItemByProperty
}