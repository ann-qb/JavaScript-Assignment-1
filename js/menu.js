let menuData = new XMLHttpRequest();
menuData.open("GET", "./api/menu.json");
menuData.send();
menuData.addEventListener("load", menu);

//Load menu, page title, and page heading dynamically from menu.json
function menu(){
    menuOptions = JSON.parse(menuData.response);
    const list = document.createElement('ul');
    const filePath = window.location.pathname.slice(1);
    console.log(filePath);
    for(let i=0;i<menuOptions.length;i++){
        const listItem = document.createElement('li');
        const listItemAnchor = document.createElement('a');
        if(menuOptions['not_found']===true){
            listItemAnchor.href = '404.html';
        }
        else{
            listItemAnchor.href = menuOptions[i]['path'];
        }
        listItemAnchor.innerHTML = menuOptions[i]['label']; 
        listItem.appendChild(listItemAnchor);
        list.appendChild(listItem);
        if(menuOptions[i]['path']===filePath){
            const pageHeading = document.getElementById('page-heading');
            pageHeading.innerHTML = menuOptions[i]['label'];
            const pageTitle = document.getElementById('page-title');
            pageTitle.innerHTML = 'RMedia - '+menuOptions[i]['label'];
        }
    }
    const nav = document.getElementById('nav');
    nav.appendChild(list);
}