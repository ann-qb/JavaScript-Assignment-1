const homePageData = new XMLHttpRequest();
homePageData.open("GET", "./api/home.json");
homePageData.send();
homePageData.addEventListener("load", home);

function home() {
    const homeData = JSON.parse(homePageData.response);
    const content = document.getElementById('page-content');
    content.innerHTML = homeData['text-content'];
    const headingRow = document.getElementById('table-heading');
    for(let i=0; i<homeData['table-headings'].length; i++) {
        const columnHead = document.createElement('th');
        columnHead.innerText = homeData['table-headings'][i];
        headingRow.appendChild(columnHead);
    }
    const toggle = document.getElementById('toggle-content');
    content.style.maxHeight = '225px';
    if(content.scrollHeight > content.clientHeight) {
        toggle.style.display = 'block';
        toggle.innerHTML = 'Read More';
    }
}

let maxHeight;

function read() {
    const textContent = document.getElementById('page-content');
    const button = document.getElementById('toggle-content');
    
    if(button.innerHTML === 'Read More') {
        button.innerHTML = 'Read Less';
        maxHeight = textContent.style.maxHeight;
        textContent.style.maxHeight = textContent.scrollHeight+'px';
    }
    else{
        button.innerHTML = 'Read More';
        textContent.style.maxHeight = maxHeight;
    }
}
