//API call to load menu.json
get("./api/menu.json", loadMenu);

//Load menu tabs dynamically from menu.json
function loadMenu(menuData) {
    const list = document.createElement('ul');

    for (let menuDataObj of menuData){
        const listItem = document.createElement('li');
        const listItemAnchor = document.createElement('a');
        if (menuDataObj['not_found'] === true) {
            listItemAnchor.href = '404.html';
        } else {
            listItemAnchor.href = menuDataObj['path'];
        }
        listItemAnchor.innerHTML = menuDataObj['label'];
        listItem.appendChild(listItemAnchor);
        list.appendChild(listItem);
    }
    
    const nav = document.querySelector('#nav');
    if (nav) {
        nav.appendChild(list);
    }
    updatePageHeadingAndTitle(menuData);
    loadUserName();
}

//Loads page title and page heading dynamically from menu.json
function updatePageHeadingAndTitle(menuData) {
    const filePath = window.location.pathname.slice(1);
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

//Add event listener to menuBtn and on click, call function to toggle display of responsive dropdown menu
const menuBtn = document.querySelector('#menu-btn');
menuBtn.addEventListener('click', toggleDropDownMenu);

//Function to toggle display of responsive dropdown menu
function toggleDropDownMenu() {
    const navMenu = document.querySelector('#nav');
    navMenu.style.display === 'none' ? navMenu.style.display = 'block' : navMenu.style.display = 'none';
}

//Add event listener to search bar. Call highlightSearch function on 'keyup'
const searchBar = document.querySelector('#search');
searchBar.addEventListener('keyup', highlightSearch);

//Function to highlight text matching the search text in main text content area of the current page
function highlightSearch() {
    const searchValue = searchBar.value;
    const pageContent = document.querySelector('#page-content').children;
    for (let pageContentChildObj of pageContent) {
        let content = pageContentChildObj.textContent;
        content.indexOf(searchValue) != -1 ? pageContentChildObj.innerHTML = content.replaceAll(searchValue, `<span id="highlight-search">${searchValue}</span>`) : pageContentChildObj.innerHTML = content;
    }
}

//Loads user name and displays 'Hi, user name'
function loadUserName() {
    const currentUser = getLocalStorage('currentUser');
    if (currentUser) {
        const userName = currentUser['firstName'] + ' ' + currentUser['lastName'];
        const displayUserName = document.querySelector('#user-name');
        displayUserName.innerHTML = `Hi, ${userName}`;
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

//Function to log out user
function logOut() {
    removeItemLocalStorage('currentUser');
    window.location.href = 'login.html';
}