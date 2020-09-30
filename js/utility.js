//Handles all GET XMLHTTPRequests
let get = function (url, callback) {

    let xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (this.status === 200) {
            console.log(callback);
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
            console.log(callback);
            callback(JSON.parse(this.response));
        } else {
            alert('Oops! Something went wrong.');
        }
    }

    xhr.open("POST", url);
    xhr.send(payloadObj);
}