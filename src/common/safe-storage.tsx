interface WindowType {
    [key:string]: any; // Add index signature
}

class SafeStorage {
    storageName = 'localStorage';

    constructor(storageName: string) {
        this.storageName = storageName;
    }

    getItem(key: string) {
        let value;
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

export default SafeStorage