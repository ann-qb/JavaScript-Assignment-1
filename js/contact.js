//import {post} from './utility.js';

//For future reference:
// const formField = getElementsByClassName('.form-field');
// formField.addEventListener('click', function() {
//     for(let i=0; i<formField.length; i++) {
//         if(this.style.border === '1px solid #ff0000') {
//             this.style.border = '#ffffff';
//         }
//     }
// });

//For future reference:
// document.querySelectorAll('.form-field').forEach(item => {
//     item.addEventListener('click', event => {
//         console.log(item.style);
//         if(item.style.border === '1px solid #ff0000') {
//             console.log("hello");
//             item.style.border = '#ffffff';
//         }
//     })
// })


//Acceptable input field formats
const nameFormat = /^[A-Za-z][A-Za-z\s]{7,24}$/;
const phoneNoFormat = /^[1-9][0-9]{9}$/;
const mailFormat = /^[a-zA-Z0-9.]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
const maxMessageLength = 255;

//Validates form input fields on clicking 'Send Message' button
function validateSend() {
    const name = nameValidate();
    const phoneNumber = numValidate();
    const email = emailValidate();
    const message = messageValidate();


    if (name && phoneNumber && email && message) {
        let reqObj;
        reqObj = { name, phoneNumber, email, message };
        reqObj = JSON.stringify(reqObj);
        console.log(reqObj); //Prints form data to console

        //For reference:
        // const xhrObj = new XMLHttpRequest();
        // xhrObj.open("POST", "nowhere.com");
        // xhrObj.send(reqObj);

        post("sendmessage.com", reqObj); //Mock API call
    }

    //For future reference:
    // let formData = new FormData(contact-form);
    // const name = formData.get('name'); 
}

//Validates name field
function nameValidate() {
    const name = document.querySelector('#name');
    const nameError = document.querySelector('#name-msg');
    if (name.value.match(nameFormat)) {
        nameError.innerHTML = '';
        return name.value;
    } else {
        name.style.border = '1px solid #ff0000';
        nameError.innerHTML = 'Name should be of length 8 to 25 characters and should only contain alphabets.';
        return false;
    }
}

//Validates phone number
function numValidate() {
    const num = document.querySelector('#num');
    const numError = document.querySelector('#num-msg');
    if (num.value.match(phoneNoFormat)) {
        numError.innerHTML = '';
        return num.value;
    } else {
        num.style.border = '1px solid #ff0000';
        numError.innerHTML = 'Please enter a valid phone number.';
        return false;
    }
}

//Validates email id
function emailValidate() {
    const email = document.querySelector('#email');
    const emailError = document.querySelector('#email-msg');
    if (email.value.match(mailFormat)) {
        emailError.innerHTML = '';
        return email.value;
    } else {
        email.style.border = '1px solid #ff0000';
        emailError.innerHTML = 'Please enter a valid email id.';
        return false;
    }
}

//Validates message
function messageValidate() {
    const message = document.querySelector('#message');
    const counter = document.querySelector('#message-counter');
    if (message.value.length > '0') {
        counter.innerHTML = '';
        return message.value;
    } else {
        message.style.border = '1px solid #ff0000';
        counter.style.color = '#ff0000';
        counter.innerHTML = 'Please enter your message.'
        return false;
    }
}

//Shows remaining character count for message textarea
function charCounter() {
    const message = document.querySelector('#message');
    const counter = document.querySelector('#message-counter');
    counter.style.color = '#000000';
    counter.innerHTML = `${maxMessageLength - message.value.length} characters remaining.`;
}