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

    loadColumnHeaders(homeData['table-headings']);
    displayToggleReadMoreButton(content);
}



//Loads column headers for table
function loadColumnHeaders(tableHeadings) {
    const headingRow = document.querySelector('#table-heading');
    const numOfColumnHeaders = tableHeadings.length;
    for (let i = 0; i < numOfColumnHeaders; i++) {
        const columnHeader = document.createElement('th');
        columnHeader.innerText = tableHeadings[i];
        headingRow.appendChild(columnHeader);
    }
}

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