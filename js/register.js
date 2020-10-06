//Acceptable name format
const nameFormat = /^[A-Za-z][A-Za-z.\s]*$/;

//Validates registration form
function validateRegistration() {
    const firstName = validateFirstName();
    const lastName = validateLastName();
    const dateOfBirth = validateDateOfBirth();
    const gender = validateGender();
    const password = validatePassword();
    const confirmPassword = matchPassword();
    const acceptTermsAndConditions = checkTermsAndConditions();

    //On successful validation
    if (firstName && lastName && dateOfBirth && gender && password && confirmPassword && acceptTermsAndConditions) {
        //User information stored as object
        let userInfo = { firstName, lastName, dateOfBirth, gender, password };
        saveUserDetails(userInfo);
    }
}

//Adds user information to user list and saves to local storage
function saveUserDetails(userInfo) {
    //Check if user list exists. If not, initialise empty array.
    let userList = getLocalStorage('userList') || [];
    userList.push(userInfo);    
    setLocalStorage("userList", userList);
    successfulMessage();
}

//Pop up message on successful registration
function successfulMessage() {
    const popUp = document.querySelector('.modal');
    popUp.style.display = 'block';
    const registerFormBlur = document.querySelector('#register-container');
    registerFormBlur.style.filter = 'blur(100px)';
}

//Validates first name
function validateFirstName() {
    const firstName = document.querySelector('#first-name');
    const errorMessage = document.querySelector('#fname-msg');
    let errorMessageContent = '';
    if (!firstName.value) {
        errorMessageContent = "First Name is a required field";
    } else if (!firstName.value.match(nameFormat)) {
        errorMessageContent = "First Name accepts only character values";
    }
    return updateErrorMessage(firstName, errorMessage, errorMessageContent);
}

//Validates last name
function validateLastName() {
    const lastName = document.querySelector('#last-name');
    const errorMessage = document.querySelector('#lname-msg');
    let errorMessageContent = '';
    if (!lastName.value) {
        errorMessageContent = "Last Name is a required field";
    } else if (!lastName.value.match(nameFormat)) {
        errorMessageContent = "Last Name accepts only character values";
    }
    return updateErrorMessage(lastName, errorMessage, errorMessageContent);
}

//Validates date of birth
function validateDateOfBirth() {
    const dateOfBirth = document.querySelector('#dob');
    const errorMessage = document.querySelector('#dob-msg');
    let errorMessageContent = '';
    if (dateOfBirth.value === '') {
        errorMessageContent = "Date of Birth is a required field";
        //return updateErrorMessage(dateOfBirth, errorMessage, errorMessageContent);
    }
    const dOB = new Date(dateOfBirth.value);
    const today = new Date();
    if (dOB > today) {
        errorMessageContent = "You cannot enter a date in the future";
        //return updateErrorMessage(dateOfBirth, errorMessage, errorMessageContent);
    }
    return updateErrorMessage(dateOfBirth, errorMessage, errorMessageContent);
}

//Checks if a gender is selected
function validateGender() {
    const male = document.querySelector('#male');
    const female = document.querySelector('#female');
    const other = document.querySelector('#other');
    const errorMessage = document.querySelector('#gender-msg');
    let errorMessageContent = '';
    let obj;
    if (male.checked) {
        obj = male;
    } else if (female.checked) {
        obj = female;
    } else if (other.checked) {
        obj = other;
    } else {
        errorMessageContent = "Please select an option";
    }
    return updateErrorMessage(obj, errorMessage, errorMessageContent);
}

//Validates password
function validatePassword() {
    const password = document.querySelector('#password');
    const errorMessage = document.querySelector('#password-msg');
    let errorMessageContent = '';
    if (password.value === '') {
        errorMessageContent = "Password is a required field";
    }
    return updateErrorMessage(password, errorMessage, errorMessageContent);
}

//Validates confirm password field and matches it with password field
function matchPassword() {
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirm-password');
    const errorMessage = document.querySelector('#confirm-msg');
    let errorMessageContent = '';
    if (confirmPassword.value === '') {
        errorMessageContent = "Confirm Password is a required field";
    }
    if (password.value != confirmPassword.value) {
        errorMessageContent = "Password mismatch";
    }
    return updateErrorMessage(confirmPassword, errorMessage, errorMessageContent);
}

//Checks if T&C has been accepted
function checkTermsAndConditions() {
    const termsAndConditions = document.querySelector('#tc-checkbox');
    const errorMessage = document.querySelector('#tc-accept');
    let errorMessageContent = '';
    if (!termsAndConditions.checked) {
        errorMessageContent = "Please accept Terms and Conditions";
    }
    return updateErrorMessage(termsAndConditions, errorMessage, errorMessageContent);
}