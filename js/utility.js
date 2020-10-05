//Handles all GET XMLHTTPRequests
let get = function (url, callback) {

    let xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (this.status === 200) {
            callback(JSON.parse(this.response));
        } else {
            alert('Oops! Something went wrong.');
        }
    }

    xhr.open("GET", url);
    xhr.send();
}

//Handles all POST XMLHTTPRequests
let post = function (url, payloadObj, callback) {

    let xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (this.status === 200) {
            callback(JSON.parse(this.response));
        } else {
            alert('Oops! Something went wrong.');
        }
    }

    xhr.open("POST", url);
    xhr.send(payloadObj);
}

//Stores data to localStorage
let setLocalStorage = (key, value) => {
    if(localStorage){
        localStorage.setItem(key, JSON.stringify(value));
    }
}

//Retrieves data from localStorage
let getLocalStorage = (key) => {
    if(localStorage){
        let value = localStorage.getItem(key);
    if (value) {
        return JSON.parse(value);
    } else {
        return false;
    }
    }
}

//Removes item from local storage
let removeItemLocalStorage = (key) => {
    if(localStorage){
        localStorage.removeItem(key);
    }
}

//Updates error message based on messageContent value
//and returns obj value if there is no error otherwise returns false
let updateErrorMessage = (obj, errorMessage, errorMessageContent) => {
    if (errorMessageContent) {
        errorMessage.innerHTML = errorMessageContent;
        if (obj)
            obj.style.border = '1px solid #ff0000';
        return false;
    } else {
        errorMessage.innerHTML = '';
        obj.style.border = '1px solid #000000';
        return obj.value;
    }
}