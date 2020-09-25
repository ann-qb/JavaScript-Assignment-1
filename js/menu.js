function menu(){
    menuOptions = JSON.parse(menuData.response);
    console.log(menuOptions[0]['label']);
    let list = document.createElement('ul');
    for(let i=0;i<menuOptions.length;i++){
        let listItem = document.createElement('li');
        let listItemAnchor = document.createElement('a');
        listItemAnchor.href = menuOptions[i]['path'];
        listItemAnchor.innerHTML = menuOptions[i]['label'];
        listItem.appendChild(listItemAnchor);
        list.appendChild(listItem);
    }
    let nav = document.getElementById('nav');
    nav.appendChild(list);
}

let menuData = new XMLHttpRequest();
menuData.open("GET", "./../api/menu.json");
menuData.send();
menuData.addEventListener("load", menu);