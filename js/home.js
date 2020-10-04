//import {get} from "./utility.js";

const textContentMaxHeight = '210px';

// For reference:
// const homePageData = new XMLHttpRequest();
// homePageData.open("GET", "./api/home.json");
// homePageData.send();
// homePageData.addEventListener("load", loadHomeData);

get("./api/home.json", loadHomeData);

//Loads homepage text content
function loadHomeData(homeData) {
    const content = document.querySelector('#page-content');
    content.innerHTML = homeData['text-content'];

    loadUserName();
    // loadColumnHeaders(homeData['table-headings']);
    displayToggleReadMoreButton(content);
}

//Loads user name and displays 'Hi user name'
function loadUserName() {
    const currentUser = getLocalStorage('currentUser');
    if(currentUser) {
        const userName = currentUser['firstName'] + ' ' + currentUser['lastName'];
        const displayUserName = document.querySelector('#user-name');
        displayUserName.innerHTML = 'Hi ' + userName;
    }
}

//Loads column headers for table
// function loadColumnHeaders(tableHeadings) {
//     const headingRow = document.querySelector('#table-heading');
//     const numOfColumnHeaders = tableHeadings.length;
//     for (let i = 0; i < numOfColumnHeaders; i++) {
//         const columnHeader = document.createElement('th');
//         columnHeader.innerText = tableHeadings[i];
//         headingRow.appendChild(columnHeader);
//     }
// }

//Displays read more button if there is text content overflow
function displayToggleReadMoreButton(content) {
    const toggleReadButton = document.querySelector('#toggle-content');
    content.style.maxHeight = textContentMaxHeight;
    if (content.scrollHeight > content.clientHeight) {
        toggleReadButton.style.display = 'block';
        toggleReadButton.innerHTML = 'Read More';
    }
}


let maxHeight; //Stores original height of text content's div container

//Implements read more/read less button logic
function readMore() {
    const textContent = document.querySelector('#page-content');
    const toggleReadMoreButton = document.querySelector('#toggle-content');

    if (toggleReadMoreButton.innerHTML === 'Read More') {
        toggleReadMoreButton.innerHTML = 'Read Less';
        maxHeight = textContent.style.maxHeight;
        textContent.style.maxHeight = textContent.scrollHeight + 'px';
    } else {
        toggleReadMoreButton.innerHTML = 'Read More';
        textContent.style.maxHeight = maxHeight;
    }
}

//Displays pop up asking user to confirm log out action 
function confirmLogOut() {
    const logOutPopUp = document.querySelector('.modal');
    logOutPopUp.style.display = 'block';
}

//Function to cancel log out action
function cancelLogOut() {
    const logOutPopUp = document.querySelector('.modal');
    logOutPopUp.style.display = 'none';
}

//Function logs out user
function logOut() {
    removeItemLocalStorage('currentUser');
    window.location.href = 'login.html';
}