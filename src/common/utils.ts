const getRandomNumber = (max = 1000) => Math.floor(Math.random() * max)

const safeLocalStorage = {
    getItem: (key: string) => {
        let value = '';
        try {
            value = JSON.parse(localStorage.getItem(key) || '');
        } catch (e) {
            console.warn(`getTheTapeApp.safeLocalStorage.getItem: ${e}`);
        }
        return value;
    },
    setItem: (key: string, value: any) => {
        try {
            const valueString = JSON.stringify(value);
            localStorage.setItem(key, valueString);
        } catch (e) {
            console.warn(`getTheTapeApp.safeLocalStorage.setItem: ${e}`);
        }
    }
}


const errorHandler = (e: any) => {
    console.log(e);
  
  };

export {
    getRandomNumber, safeLocalStorage, errorHandler
}