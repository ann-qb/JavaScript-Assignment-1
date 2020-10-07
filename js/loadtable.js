//Function to identify current page and make appropriate API call
function makeAPICall() {
    const currentPage = currentPageIdentifier();
    if (currentPage !== 'contact') {
        get('./api/' + currentPage + 'Table.json', loadTable);
    }
}

//Invoke function to identify current page and make appropriate API call
makeAPICall();

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
    for (let eachColumnHeader of columnConfig) {
        const columnHeader = document.createElement('th');

        //Invoke column header configuration function
        columnHeaderConfig(columnHeader, eachColumnHeader);

        headingRow.appendChild(columnHeader);
    }
}

//Column header configuration function
function columnHeaderConfig(columnHeader, eachColumnHeader) {
    //Set sortable and type attributes
    columnHeader.setAttribute('data-sortable', eachColumnHeader.sortable);
    columnHeader.setAttribute('data-type', eachColumnHeader.type);

    //Add icons to indicate sortable columns using template string
    if (eachColumnHeader.sortable && eachColumnHeader.type !== 'link' && eachColumnHeader.type !== 'button' && (eachColumnHeader.type === 'number' || eachColumnHeader.type === 'string' || eachColumnHeader.type === 'date')) {
        columnHeader.innerHTML = `${eachColumnHeader.title}${sort}`;
    }
    else {
        columnHeader.innerHTML = eachColumnHeader.title;
    }

    //Set column header id
    columnHeader.setAttribute('id', eachColumnHeader.id);
}

//Loads table rows
function loadRows(data) {
    const tableBody = document.querySelector('#table-body');
    for (let eachRow of data) {
        const row = document.createElement('tr');
        for (let eachColumn of columnConfig) {
            const cell = document.createElement('td');

            //Invoke function to implement table cell logic
            tableCellConfig(cell, eachColumn, eachRow);

            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
}

//Function to implement table cell logic
function tableCellConfig(cell, eachColumn, eachRow) {
    if (eachColumn.type == 'number') {
        cell.innerHTML = eachRow[eachColumn.id];
        cell.style.textAlign = 'right';
    } else if (eachColumn.type == 'link') {
        const anchorTag = createNewAnchorElement(eachRow[eachColumn.id], true);
        anchorTag.innerHTML = 'See Post';
        anchorTag.style.textDecoration = 'underline';
        anchorTag.onmouseenter = function () {
            anchorTag.style.color = '#ffffff';
        }
        anchorTag.onmouseleave = function () {
            anchorTag.style.color = '#000000';
        }
        cell.appendChild(anchorTag);
    } else if (eachColumn.type === 'button') {
        if (eachRow[eachColumn.id] === 'open') {
            const buttonTag = document.createElement('button');
            buttonTag.innerHTML = 'Apply';
            buttonTag.style.padding = '2px 10px';
            buttonTag.style.borderWidth = '1px';
            buttonTag.style.borderRadius = '2px';
            buttonTag.style.outline = 'none';
            buttonTag.style.backgroundColor = '#eeeeee';
            buttonTag.onmouseenter = function () {
                buttonTag.style.backgroundColor = '#78DD90';
            }
            buttonTag.onmouseleave = function () {
                buttonTag.style.backgroundColor = '#eeeeee';
            }
            cell.appendChild(buttonTag);
            buttonTag.onclick = function () {
                alert("Applied Successfully!");
            }
        } else {
            cell.innerHTML = '-';
        }
    } else {
        cell.innerHTML = eachRow[eachColumn.id];
        if (eachColumn.type === 'date')
            cell.style.textAlign = 'right';
    }
    cell.className = eachColumn.id;
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
        const isAscendingSort = determineSortType(column);

        //Invoke function to sort rows based on column value
        sortRows(column, isAscendingSort);
    }
});


// Function determines type of sort to be done by looking at the icon in the column header and returns isAscendingSort
// isAscendingSort = true to sort in ascending order 
// isAscendingSort = false to sort in descending order 
// Icon in the column header gives current sort status of that column
// 'sort' indicates currently unsorted column
// 'sort-up' indicates ascending sort
// 'sort-down' indicates descending sort
function determineSortType(column) {
    // Initially set isAscendingSort to true for ascending sort
    let isAscendingSort = true;
    //Get all sortable columns
    const sortableColumns = document.querySelectorAll('[data-sortable="true"]');
    for (let eachValue of sortableColumns) {
        if (eachValue.id === column.id) {
            //Current column is the column to be sorted. Determine its sort type
            if (eachValue.innerHTML.match('sort-up')) {
                // Currently sorted in ascending order, changes sort type to descending order (isAscendingSort = false)
                eachValue.innerHTML = eachValue.innerHTML.replace('sort-up', 'sort-down');
                isAscendingSort = false;
            } else if (eachValue.innerHTML.match('sort-down')) {
                // Currently sorted in descending order, changes sort type to ascending order (isAscendingSort = true)
                eachValue.innerHTML = eachValue.innerHTML.replace('sort-down', 'sort-up');
            } else if (eachValue.innerHTML.match('sort')) {
                // Currently unsorted, sets sort type to ascending order (isAscendingSort = true) 
                eachValue.innerHTML = eachValue.innerHTML.replace('sort', 'sort-up');
            }
        }
        else {
            //Current column is not the column to be sorted so set its icon to 'sort' to indicate unsorted column
            eachValue.innerHTML = eachValue.innerHTML.replace('sort-up', 'sort');
            eachValue.innerHTML = eachValue.innerHTML.replace('sort-down', 'sort');
        }
    }
    return isAscendingSort;
}

//Function to sort rows based on column value
//Sorts elements of tableContent array
function sortRows(column, isAscendingSort) {

    if (column.dataset.type === 'number') {
        tableContent.sort((a, b) => parseInt(a[column.id]) - parseInt(b[column.id]));
    } else {
        tableContent.sort((a, b) => {
            let x = a[column.id].toLowerCase();
            let y = b[column.id].toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
        });
    }
    if (!isAscendingSort) tableContent.reverse();

    const tableBody = document.querySelector('#table-body');
    //Invoke function to remove current rows from table body
    removeTableBodyRows(tableBody);

    //Invoke function to load new sorted rows
    loadRows(tableContent);
}

//Function to remove current rows from table body
function removeTableBodyRows(tableBody) {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}