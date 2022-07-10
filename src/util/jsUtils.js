export const setLocalStorage = (key, value) => {
    localStorage && localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
    const retrievedData = localStorage.getItem(key);
    if (localStorage && retrievedData) {
        return JSON.parse(retrievedData);
    }
};