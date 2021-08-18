import { stringify } from "querystring";
import { MutableRefObject } from "react";

const getRandomNumber = (max = 1000) => Math.floor(Math.random() * max)

interface WindowType {
    [key:string]: any; // Add index signature
}

class SafeStorage {
    storageName = 'localStorage';

    constructor(storageName: string) {
        this.storageName = storageName;
    }

    getItem(key: string) {
        let value = '';
        try {
            value = JSON.parse((window as WindowType)[this.storageName].getItem(key) || '');
        } catch (e) {
            console.warn(`getTheTapeApp.safe${this.storageName}.getItem: ${e}`);
        }
        return value;
    }

    setItem(key: string, value: any): void {
        try {
            const valueString = JSON.stringify(value);
            (window as WindowType)[this.storageName].setItem(key, valueString);
        } catch (e) {
            console.warn(`getTheTapeApp.safe${this.storageName}.setItem: ${e}`);
        }
    }
}

// add safety check in case i is corrupted
const returnBody = (i: any) => i.data.body;

const safeLocalStorage = new SafeStorage('localStorage');
const safeSessionStorage = new SafeStorage('sessionStorage');

const errorHandler = (e: any) => {
    console.log(e);
};

const divideArray = (e: Array<number>, divider = 100) => {
    return e.map(i => i / divider)
}

const haveACopyInArray = (item: any, array: Array<any>) => (array.findIndex((i: ITrack) => {
    return i.id === item?.id;
}) !== -1);

const clearSelectedValue = (selectorRef) => {
    selectorRef.current?.select?.select?.clearValue();
}

export {
    getRandomNumber,
    safeLocalStorage,
    safeSessionStorage,
    errorHandler,
    returnBody,
    divideArray,
    clearSelectedValue,
    haveACopyInArray
}