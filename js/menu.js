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