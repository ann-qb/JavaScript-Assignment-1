function validateSend() {
    const name = document.getElementById('name');
    const num = document.getElementById('num');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    nameValidate(name);
    numValidate(num);
    emailValidate(email);
    messageValidate(message);

    // let formData = new FormData(contact-form);
    // const name = formData.get('name');
    
    // if(subject.value.length > 25) {
    //     const subjectError = document.createElement('p');
    //     subjectError.innerHTML = 'Maximum length is 25 characters.';
    //     const subjectErrorMsg = document.getElementById('subject-container');
    //     subjectErrorMsg.appendChild(subjectError);
    // }    
}

function nameValidate(name) {
    const nameError = document.getElementById('name-msg');
    var letters = /^[A-Za-z][A-Za-z\s]{7,24}$/;
    if(name.value.match(letters)) {
        nameError.innerHTML = '';
    }
    else {
        nameError.innerHTML = 'Name should be of length 8 to 25 characters and should only contain alphabets.';
    }
}

function numValidate() {
    const numError = document.getElementById('num-msg');
    var phoneNo = /^[1-9][0-9]{9}$/;
    if(num.value.match(phoneNo)) {
        numError.innerHTML = '';
    }
    else {
        numError.innerHTML = 'Please enter a valid phone number.';
    }
}

function emailValidate() {
    const emailError = document.getElementById('email-msg');
    var mailformat = /^[a-zA-Z0-9.]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
    if(email.value.match(mailformat)) {
        console.log(email.value);
        emailError.innerHTML = '';
    }
    else {
        emailError.innerHTML = 'Please enter a valid email id.';
    }
}

function messageValidate(message) {
    const counter = document.getElementById('message-counter');
    if(message.value.length > '0') {
        counter.innerHTML = '';
        return true;
    }
    else {
        counter.innerHTML = 'Please enter your message.'
        return false;
    }
}

function charCounter() {
    const message = document.getElementById('message');
    const counter = document.getElementById('message-counter');
    counter.innerHTML = `${255 - message.value.length} characters remaining.`;
}