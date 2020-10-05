//Identifies current page and loads table json file accordingly
const currentPage = window.location.pathname.slice(1);
switch (currentPage) {
    case 'home.html': get('./api/hometable.json', loadTable);
        break;
    case 'about.html': get('./api/abouttable.json', loadTable);
        break;
    case 'services.html': get('./api/servicestable.json', loadTable);
        break;
}



const sort = '<i class="fas fa-sort"></i>';
const sortUp = '<i class="fas fa-sort-up"></i>';
const sortDown = '<i class="fas fa-sort-down"></i>';

let columnConfig;
let tableContent;

//Loads table
function loadTable(tableData) {

    //Save column config information to global variable
    columnConfig = tableData.columnConfig;
    tableContent = tableData.data;
    //Invoke function to load table headers 
    loadColumnHeaders(columnConfig);

    //Invoke function to load table rows
    loadRows(tableContent);
}

//Loads column headers for table
function loadColumnHeaders(columnConfig) {

    const headingRow = document.querySelector('#table-heading');

    const numOfColumnHeaders = columnConfig.length;
    for (let i = 0; i < numOfColumnHeaders; i++) {
        const columnHeader = document.createElement('th');
        columnHeader.setAttribute('data-sortable', columnConfig[i].sortable);
        columnHeader.setAttribute('data-type', columnConfig[i].type);
        if (columnConfig[i].sortable === true && columnConfig[i].type != 'link' && columnConfig[i].type != 'button')
            columnHeader.innerHTML = `${columnConfig[i].title}${sort}`;
        else columnHeader.innerHTML = columnConfig[i].title;
        columnHeader.setAttribute('id', columnConfig[i].id);
        headingRow.appendChild(columnHeader);
    }
}

function loadRows(data) {
    const tableBody = document.querySelector('#table-body');
    for (let eachRow of data) {
        const row = document.createElement('tr');
        for (let eachColumn of columnConfig) {
            const cell = document.createElement('td');
            if (eachColumn.type == 'number') {
                cell.className = eachColumn.id;
                cell.innerHTML = eachRow[eachColumn.id];
            } else if (eachColumn.type == 'link') {
                const anchorTag = document.createElement('a');
                anchorTag.href = eachRow[eachColumn.id];
                anchorTag.target = '_blank';
                anchorTag.innerHTML = 'See Post';
                cell.className = eachColumn.id;
                cell.appendChild(anchorTag);
            } else if (eachColumn.type === 'button') {
                if (eachRow[eachColumn.id] === 'open') {
                    const buttonTag = document.createElement('button');
                    buttonTag.innerHTML = 'Apply';
                    cell.appendChild(buttonTag);
                    buttonTag.onclick = function() {
                        alert("Applied Successfully!");
                    }
                } else {
                    cell.innerHTML = '-';
                }
                cell.className = eachColumn.id;
            } else {
                cell.className = eachColumn.id;
                cell.innerHTML = eachRow[eachColumn.id];
            }
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }

}

const tableHeading = document.querySelector('#table-heading');
tableHeading.addEventListener('click', function (e) {

    const column = e.target;

    if (column.dataset.sortable === 'true' && (column.dataset.type === 'string' || column.dataset.type === 'number' || column.dataset.type === 'date')) {
        const columnElements = document.querySelectorAll(`.${column.id}`);

        const sortType = determineSortType(column);
        
        
        let columnElementsArray = [];
        
        if (column.dataset.type == 'number') {
            for(let eachElement of columnElements){
                columnElementsArray.push(parseInt(eachElement.textContent));
            }
            if(sortType === 0){
                columnElementsArray.sort((a, b) => a - b);
            } else columnElementsArray.sort((a, b) => b - a);
        }
        else {
            for(let eachElement of columnElements){
                columnElementsArray.push(eachElement.textContent);
            }
            columnElementsArray.sort();
            if(sortType === 1){
                columnElementsArray.reverse();
            }
        }
        const tableBody = document.querySelector('#table-body');
        removeTableBodyRows(tableBody);
        createNewSortedRows(columnElementsArray, column.id);
    }
})

function determineSortType(column){
    let sortType = 0;
    const sortableColumns = document.querySelectorAll('[data-sortable="true"]');
        for(let eachValue of sortableColumns){
            if(eachValue.id === column.id){
                if(eachValue.innerHTML.match('sort-up')){
                    eachValue.innerHTML = eachValue.innerHTML.replace('sort-up', 'sort-down');
                    sortType = 1;
                } else if(eachValue.innerHTML.match('sort-down')) {
                    eachValue.innerHTML = eachValue.innerHTML.replace('sort-down', 'sort-up');
                } else if(eachValue.innerHTML.match('sort')) {
                    eachValue.innerHTML = eachValue.innerHTML.replace('sort', 'sort-up');
                }
            }
            else {
                eachValue.innerHTML = eachValue.innerHTML.replace('sort-up', 'sort');
                eachValue.innerHTML = eachValue.innerHTML.replace('sort-down', 'sort');
            }
        }
    return sortType;
}

function removeTableBodyRows(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function createNewSortedRows(sortedColumnValues, columnID) {
    let newSortedRows = [];
    for(let eachValue of sortedColumnValues) {
        for(let eachRowValue of tableContent){
            if(eachValue === eachRowValue[columnID]) {
                newSortedRows.push(eachRowValue);
            }
        }
    }
    loadRows(newSortedRows);
}
// tableHeading.addEventListener('click', function() {
//     identifyClickTarget(event);
// });

// function identifyClickTarget(event){
//     console.log(event.target);
// }