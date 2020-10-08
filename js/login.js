//Invoke function to check if a user is already logged in
checkLoggedInUser();

//Function to check if a user is already logged in
//If yes, redirect to home.html
function checkLoggedInUser() {
    if (getLocalStorage('currentUser')) {
        window.location.href = 'home.html';
    }
}

//Login function
function login() {
    const userName = validateUserName();
    const password = validatePassword();

    if (userName && password) {
        let userExists = checkUserList(userName, password);
        if (userExists) {
            //User exists, redirect to home.html
            window.location.href = 'home.html';
        } else {
            //User does not exist, show error message
            const loginFailMessage = document.querySelector('#fail-msg');
            loginFailMessage.innerHTML = 'User name or password is incorrect';
        }
    }
}

//Function to check if user exists in localStorage. If yes, returns true, else returns false. 
function checkUserList(userName, password) {
    const userList = getLocalStorage('userList');
    if(userList && userList.length) {
        for (let userListObj of userList) {
            if (userListObj && userListObj['firstName'] == userName && userListObj['password'] == password) {
                //User exists. Store user information in 'currentUser' to identify currently logged in user.
                setLocalStorage('currentUser', userListObj);
                return true;
            }
        }
    } else return false;
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