//import {get} from "./utility.js";

get("./api/menu.json", loadMenu);

//Load menu tabs dynamically from menu.json
function loadMenu(menuData) {
    const list = document.createElement('ul');
    const numOfMenuTabs = menuData.length;
    for (let i = 0; i < numOfMenuTabs; i++) {
        const listItem = document.createElement('li');
        const listItemAnchor = document.createElement('a');
        if (menuData['not_found'] === true) {
            listItemAnchor.href = '404.html';
        } else {
            listItemAnchor.href = menuData[i]['path'];
        }
        listItemAnchor.innerHTML = menuData[i]['label'];
        listItem.appendChild(listItemAnchor);
        list.appendChild(listItem);
    }
    const nav = document.querySelector('#nav');
    if (nav) {
        nav.appendChild(list);
    }
    updatePageHeadingAndTitle(menuData);
}

//Loads page title and page heading dynamically from mmenu.json
function updatePageHeadingAndTitle(menuData) {
    const filePath = window.location.pathname.slice(1);

    //For reference:
    // const forEachCallback = (element, elementIndex) => {
    //     console.log(elementIndex, element);
    //     if (element['path'] === filePath) {
    //         const pageHeading = document.querySelector('#page-heading');
    //         pageHeading.innerHTML = element['label'];
    //         const pageTitle = document.querySelector('title');
    //         pageTitle.innerHTML = 'RMedia - ' + element['label'];
    //     }
    // }
    // menuData.forEach(forEachCallback);

    menuData.forEach(element => {
        if (element['path'] === filePath) {
            const pageHeading = document.querySelector('#page-heading');
            if (pageHeading) {
                pageHeading.innerHTML = element['label'];
            }
            const pageTitle = document.querySelector('title');
            pageTitle.innerHTML = 'RMedia - ' + element['label'];
        }
    });
}

const menuBtn = document.querySelector('#menu-btn');
menuBtn.addEventListener('click', toggleDropDownMenu);

//Function to toggle display of responsive dropdown menu
function toggleDropDownMenu() {
    const navMenu = document.querySelector('#nav');
    if (navMenu.style.display === 'none') {
        navMenu.style.display = 'block';
    } else {
        navMenu.style.display = 'none';
    }
}

const searchBar = document.querySelector('#search');
searchBar.addEventListener('keyup', highlightSearch);

function highlightSearch(){
    const searchValue = searchBar.value;
    const pageContent = document.querySelector('#page-content').children;
    for(let eachChild of pageContent){
        let content = eachChild.textContent;
        if(content.indexOf(searchValue)!=-1){
            eachChild.innerHTML = content.replaceAll(searchValue, `<span id="highlight-search">${searchValue}</span>`);
        }
        else eachChild.innerHTML = content;
    }
}