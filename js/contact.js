// const formField = getElementsByClassName('.form-field');
// formField.addEventListener('click', function() {
//     for(let i=0; i<formField.length; i++) {
//         if(this.style.border === '1px solid #ff0000') {
//             this.style.border = '#ffffff';
//         }
//     }
// });

// document.querySelectorAll('.form-field').forEach(item => {
//     item.addEventListener('click', event => {
//         console.log(item.style);
//         if(item.style.border === '1px solid #ff0000') {
//             console.log("hello");
//             item.style.border = '#ffffff';
//         }
//     })
// })

//Function triggers on clicking 'Send Message' button
function validateSend() {
    const name = nameValidate();
    const num =  numValidate();
    const email = emailValidate();
    const message = messageValidate();

    let reqObj;
    if(name && num && email && message) {
        reqObj = {name, num, email, message};
        console.log(reqObj);
        reqObj = JSON.stringify(reqObj);
        console.log(reqObj);
        const xhrObj = new XMLHttpRequest();
        xhrObj.open("POST", "nowhere.com");
        xhrObj.send(reqObj);
    }
    // let formData = new FormData(contact-form);
    // const name = formData.get('name');
    
    // if(subject.value.length > 25) {
    //     const subjectError = document.createElement('p');
    //     subjectError.innerHTML = 'Maximum length is 25 characters.';
    //     const subjectErrorMsg = document.getElementById('subject-container');
    //     subjectErrorMsg.appendChild(subjectError);
    // }    
}

//To validate name field
function nameValidate() {
    const name = document.getElementById('name');
    const nameError = document.getElementById('name-msg');
    var letters = /^[A-Za-z][A-Za-z\s]{7,24}$/;
    if(name.value.match(letters)) {
        nameError.innerHTML = '';
        return name.value;
    }
    else {
        //name.style.border = '1px solid #ff0000';
        nameError.innerHTML = 'Name should be of length 8 to 25 characters and should only contain alphabets.';
        return false;
    }
}

//To validate phone number
function numValidate() {
    const num = document.getElementById('num');
    const numError = document.getElementById('num-msg');
    var phoneNo = /^[1-9][0-9]{9}$/;
    if(num.value.match(phoneNo)) {
        numError.innerHTML = '';
        return num.value;
    }
    else {
        numError.innerHTML = 'Please enter a valid phone number.';
        return false;
    }
}

//To validates email id
function emailValidate() {
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-msg');
    var mailformat = /^[a-zA-Z0-9.]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
    if(email.value.match(mailformat)) {
        emailError.innerHTML = '';
        return email.value;
    }
    else {
        emailError.innerHTML = 'Please enter a valid email id.';
        return false;
    }
}

//To validate message
function messageValidate() {
    const message = document.getElementById('message');
    const counter = document.getElementById('message-counter');
    if(message.value.length > '0') {
        counter.innerHTML = '';
        return message.value;
    }
    else {
        counter.innerHTML = 'Please enter your message.'
        return false;
    }
}

//Shows remaining character count for message textarea
function charCounter() {
    const message = document.getElementById('message');
    const counter = document.getElementById('message-counter');
    counter.innerHTML = `${255 - message.value.length} characters remaining.`;
}