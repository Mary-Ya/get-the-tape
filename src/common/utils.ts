import { ITrack } from "@interfaces/track";
import SafeStorage from "./safe-storage";

const getRandomNumber = (max = 1000) => Math.floor(Math.random() * max)

const returnBody = (i: any) => {
    return i.data.body;
};

const safeLocalStorage = new SafeStorage('localStorage');
const safeSessionStorage = new SafeStorage('sessionStorage');

const errorHandler = (e: any) => {
    console.log(e);
};

const divideArray = (e: Array<number | null>, divider = 100) => {
    return e.map(i => i ? i / divider : null)
}

const haveACopyInArray = (item: any, array: Array<any>) => (array.findIndex((i: ITrack) => {
    return i.id === item?.id;
}) !== -1);

const clearSelectedValue = (selectorRef) => {
    selectorRef.current?.select?.select?.clearValue();
}

const cleanObject = (data: any) => {
    let cleanData = { ...data };
    Object.keys(cleanData).forEach(key => !cleanData[key] ? delete cleanData[key] : {});
    return cleanData;
}

const deserialize = (search: string) =>
    Object.fromEntries(new URLSearchParams(search));

    
const removeItemByProperty = (data: any[], filter: any, propName: string) => {
    const newSongSeeds = data.filter((i) => i[propName] !== filter);
    return newSongSeeds;
};

export {
    getRandomNumber,
    safeLocalStorage,
    safeSessionStorage,
    errorHandler,
    returnBody,
    divideArray,
    clearSelectedValue,
    haveACopyInArray,
    cleanObject,
    deserialize,
    removeItemByProperty
}