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


// Sortability/Sort type (ascending/descending) indicator icons (present in column headers of sortable columns)
//Sortable column
const sort = '<i class="fas fa-sort"></i>';
//Sorted in ascending order
const sortUp = '<i class="fas fa-sort-up"></i>';
//Sorted in descending order
const sortDown = '<i class="fas fa-sort-down"></i>';

//Global variables to store table column config info and table content
let columnConfig;
let tableContent;

//Loads table
function loadTable(tableData) {

    //Saves column config information to global variable
    columnConfig = tableData.columnConfig;

    //Saves table data to global variable
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

        //Set sortable and type attributes
        columnHeader.setAttribute('data-sortable', columnConfig[i].sortable);
        columnHeader.setAttribute('data-type', columnConfig[i].type);

        //Add icons to indicate sortable columns using template string
        if (columnConfig[i].sortable === true && columnConfig[i].type != 'link' && columnConfig[i].type != 'button')
            columnHeader.innerHTML = `${columnConfig[i].title}${sort}`;
        else columnHeader.innerHTML = columnConfig[i].title;

        columnHeader.setAttribute('id', columnConfig[i].id);
        headingRow.appendChild(columnHeader);
    }
}

//Loads table rows
function loadRows(data) {
    const tableBody = document.querySelector('#table-body');
    for (let eachRow of data) {
        const row = document.createElement('tr');
        for (let eachColumn of columnConfig) {
            const cell = document.createElement('td');
            if (eachColumn.type == 'number') {
                cell.className = eachColumn.id;
                cell.innerHTML = eachRow[eachColumn.id];
                cell.style.textAlign = 'right';
            } else if (eachColumn.type == 'link') {
                const anchorTag = document.createElement('a');
                anchorTag.href = eachRow[eachColumn.id];
                anchorTag.target = '_blank';
                anchorTag.innerHTML = 'See Post';
                anchorTag.style.textDecoration = 'underline';
                anchorTag.onmouseenter = function() {
                    anchorTag.style.color = '#ffffff';
                }
                anchorTag.onmouseleave = function() {
                    anchorTag.style.color = '#000000';
                }
                cell.className = eachColumn.id;
                cell.appendChild(anchorTag);
            } else if (eachColumn.type === 'button') {
                if (eachRow[eachColumn.id] === 'open') {
                    const buttonTag = document.createElement('button');
                    buttonTag.innerHTML = 'Apply';
                    buttonTag.style.padding = '2px 10px';
                    buttonTag.style.borderWidth = '1px';
                    buttonTag.style.outline = 'none';
                    buttonTag.style.backgroundColor = '#eeeeee';
                    buttonTag.onmouseenter = function() {
                        buttonTag.style.backgroundColor = '#78DD90';
                    }
                    buttonTag.onmouseleave = function() {
                        buttonTag.style.backgroundColor = '#eeeeee';
                    }
                    cell.appendChild(buttonTag);
                    buttonTag.onclick = function () {
                        alert("Applied Successfully!");
                    }
                } else {
                    cell.innerHTML = '-';
                }
                cell.className = eachColumn.id;
            } else {
                cell.className = eachColumn.id;
                cell.innerHTML = eachRow[eachColumn.id];
                if(eachColumn.type === 'date')
                    cell.style.textAlign = 'right';
            }
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
}

//Add event listener to tr of thead
const tableHeading = document.querySelector('#table-heading');
//On click, identify target column and check if it is sortable 
tableHeading.addEventListener('click', function (e) {
    //Identify target column of click event
    const column = e.target;

    //Determine if target column is sortable
    if (column.dataset.sortable === 'true' && (column.dataset.type === 'string' || column.dataset.type === 'number' || column.dataset.type === 'date')) {

        //Invoke function to determine sort type (ascending or descending)
        const sortType = determineSortType(column);

        //Invoke function to sort target column
        sortColumn(column, sortType);
    }
});


// Function determines type of sort to be done by looking at the icon in the column header and returns sortType
//sortType = 0 to sort in ascending order 
//sortType = 1 to sort in descending order 
// Icon in the column header gives current sort status of that column
// 'sort' indicates currently unsorted column
// 'sort-up' indicates ascending sort
// 'sort-down' indicates descending sort
function determineSortType(column) {
    // Initially set sortType to ascending sort
    let sortType = 0;
    //Get all sortable columns
    const sortableColumns = document.querySelectorAll('[data-sortable="true"]');
    for (let eachValue of sortableColumns) {
        if (eachValue.id === column.id) {
            //Current column is the column to be sorted. Determine its sort type
            if (eachValue.innerHTML.match('sort-up')) {
                // Currently sorted in ascending order, changes sort type to descending order (sortType = 1)
                eachValue.innerHTML = eachValue.innerHTML.replace('sort-up', 'sort-down');
                sortType = 1;
            } else if (eachValue.innerHTML.match('sort-down')) {
                // Currently sorted in descending order, changes sort type to ascending order (sortType = 0)
                eachValue.innerHTML = eachValue.innerHTML.replace('sort-down', 'sort-up');
            } else if (eachValue.innerHTML.match('sort')) {
                // Currently unsorted, sets sort type to ascending order (sortType = 0) 
                eachValue.innerHTML = eachValue.innerHTML.replace('sort', 'sort-up');
            }
        }
        else {
            //Current column is not the column to be sorted so set its icon to 'sort' to indicate unsorted column
            eachValue.innerHTML = eachValue.innerHTML.replace('sort-up', 'sort');
            eachValue.innerHTML = eachValue.innerHTML.replace('sort-down', 'sort');
        }
    }
    return sortType;
}

//Function to sort values of target column
function sortColumn(column, sortType) {
    //Get all elements of target column ('td' elements with class = column.id)
    const columnElements = document.querySelectorAll(`.${column.id}`);

    //Empty array to insert column values into before sorting
    let columnElementsArray = [];

    if (column.dataset.type == 'number') {
        for (let eachElement of columnElements) {
            columnElementsArray.push(parseInt(eachElement.textContent));
        }
        //If sortType === 0 ascending sort else descending sort
        columnElementsArray.sort((a, b) => sortType === 0 ? a - b : b - a);
    }
    else {
        for (let eachElement of columnElements) {
            columnElementsArray.push(eachElement.textContent);
        }
        columnElementsArray.sort();
        if (sortType === 1) {
            columnElementsArray.reverse();
        }
    }

    const tableBody = document.querySelector('#table-body');
    //Function call to remove current rows from table body
    removeTableBodyRows(tableBody);

    //Invoke function to create new sorted rows
    createNewSortedRows(columnElementsArray, column.id);
}

//Function to remove current rows from table body
function removeTableBodyRows(tableBody) {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}

//Function to create new array with sorted rows as elements
//Finds the corresponding row for each sorted column value and inserts it into newSortedRows array in that order
function createNewSortedRows(sortedColumnValues, columnID) {
    let newSortedRows = [];
    for (let eachValue of sortedColumnValues) {
        for (let eachRowValue of tableContent) {
            if (eachValue === eachRowValue[columnID]) {
                newSortedRows.push(eachRowValue);
            }
        }
    }

    //Invokes function to load new sorted rows
    loadRows(newSortedRows);
}

//For reference: Why did they not work?
// tableHeading.addEventListener('click', function() {
//     identifyClickTarget(event);
// });

// function identifyClickTarget(event){
//     console.log(event.target);
// }