export const appendQueryParams = (url, requestObj) => {
    let newUrl = url;
    Object.keys(requestObj).forEach((prop, index) => {
        if (index === 0) {
            newUrl += "?";
        }
        newUrl += `${prop}=${requestObj[ prop ]}`;
    });
    return newUrl;
};

export const extractOptionValue = (optionString = "") => {
    let option = "";
    if (optionString.length) {
        option = optionString.replace("(", "").replace(")", "").trim();
    }
    return option;
};