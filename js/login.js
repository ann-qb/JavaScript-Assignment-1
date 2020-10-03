//Check if a user is already logged in
if (getLocalStorage('currentUser')) {
    window.location.href = 'home.html';
}

//Login function
function login() {
    const userName = validateUserName();
    const password = validatePassword();

    if (userName && password) {
        let loginStatus = checkUserList(userName, password);
        if (loginStatus) {
            window.location.href = 'home.html';
        } else {
            const loginFailMessage = document.querySelector('#fail-msg');
            loginFailMessage.innerHTML = 'User name or password is incorrect';
        }
    }
}

//Check if user exists in user list
function checkUserList(userName, password) {
    const userList = getLocalStorage('userList');
    if(userList) {
        for (let eachValue of userList) {
            if (eachValue['firstName'] == userName && eachValue['password'] == password) {
                setLocalStorage('currentUser', eachValue);
                return true;
            }
        }
    } else {
        return false;
    }
}

//Acceptable name format
const nameFormat = /^[A-Za-z][A-Za-z.]*$/;

//Validates user name
function validateUserName() {
    const userName = document.querySelector('#user-name');
    const errorMessage = document.querySelector('#name-msg');
    let errorMessageContent = '';
    if (!userName.value.match(nameFormat)) {
        errorMessageContent = "Please enter a valid username";
    }
    return updateErrorMessage(userName, errorMessage, errorMessageContent);
}

//Validates password
function validatePassword() {
    const password = document.querySelector('#password');
    const errorMessage = document.querySelector('#password-msg');
    let errorMessageContent = '';
    if (password.value === '') {
        errorMessageContent = "Please enter your password";
    }
    return updateErrorMessage(password, errorMessage, errorMessageContent);
}