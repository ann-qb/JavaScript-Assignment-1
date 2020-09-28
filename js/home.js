const homePageData = new XMLHttpRequest();
homePageData.open("GET", "./api/home.json");
homePageData.send();
homePageData.addEventListener("load", loadHomeData);

function loadHomeData() {
    const homeData = JSON.parse(homePageData.response);
    const content = document.getElementById('page-content');
    content.innerHTML = homeData['text-content'];
    const headingRow = document.getElementById('table-heading');
    for(let i=0; i<homeData['table-headings'].length; i++) {
        const columnHead = document.createElement('th');
        columnHead.innerText = homeData['table-headings'][i];
        headingRow.appendChild(columnHead);
    }
    const toggleReadButton = document.getElementById('toggle-content');
    content.style.maxHeight = '225px';
    if(content.scrollHeight > content.clientHeight) {
        toggleReadButton.style.display = 'block';
        toggleReadButton.innerHTML = 'Read More';
    }
}

let maxHeight;

function readMore() {
    const textContent = document.getElementById('page-content');
    const toggleReadMoreButton = document.getElementById('toggle-content');
    
    if(toggleReadMoreButton.innerHTML === 'Read More') {
        toggleReadMoreButton.innerHTML = 'Read Less';
        maxHeight = textContent.style.maxHeight;
        textContent.style.maxHeight = textContent.scrollHeight+'px';
    }
    else{
        toggleReadMoreButton.innerHTML = 'Read More';
        textContent.style.maxHeight = maxHeight;
    }
}
