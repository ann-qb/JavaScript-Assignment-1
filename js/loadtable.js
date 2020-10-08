//Function identifies current page and makes appropriate API call
function fetchTableDetails() {
    const currentPage = currentPageIdentifier();
    if (currentPage !== 'contact') {
        get('./api/' + currentPage + 'Table.json', loadTable);
    }
}

fetchTableDetails();

//Sortability/Sort type (ascending/descending) indicator icons (present in column headers of sortable columns)
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
    columnConfig = tableData.columnConfig;
    tableContent = tableData.data;
    loadColumnHeaders(columnConfig);
    loadRows(tableContent);
}

//Loads column headers for table
function loadColumnHeaders(columnConfig) {
    const headingRow = document.querySelector('#table-heading');
    for (let columnConfigObj of columnConfig) {
        const columnHeader = columnHeaderConfig(columnConfigObj);
        headingRow.appendChild(columnHeader);
    }
}

//Column header configuration function
function columnHeaderConfig(columnConfigObj) {
    const columnHeader = document.createElement('th');
    columnHeader.setAttribute('data-sortable', columnConfigObj.sortable);
    columnHeader.setAttribute('data-type', columnConfigObj.type);
    columnHeader.setAttribute('id', columnConfigObj.id);

    //Add icons to indicate sortable columns using template string
    columnConfigObj.sortable && columnConfigObj.type !== 'link' && columnConfigObj.type !== 'button' ? columnHeader.innerHTML = `${columnConfigObj.title}${sort}` : columnHeader.innerHTML = columnConfigObj.title;

    return columnHeader;
}

//Loads table rows
function loadRows(data) {
    const tableBody = document.querySelector('#table-body');
    for (let rowObj of data) {
        const row = document.createElement('tr');
        for (let columnObj of columnConfig) {
            const cell = tableCellConfig(columnObj, rowObj);
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
}

//Function to implement table cell logic
function tableCellConfig(columnObj, rowObj) {
    const cell = document.createElement('td');
    if (columnObj.type === 'number') {
        cell.innerHTML = rowObj[columnObj.id];
        cell.style.textAlign = 'right';
    } else if (columnObj.type === 'link') {
        const anchorTag = setTableHyperlinkCell(rowObj[columnObj.id]);
        cell.appendChild(anchorTag);
    } else if (columnObj.type === 'button') {
        if (rowObj[columnObj.id] === 'open') {
            const buttonTag = setTableButtonCell();
            cell.appendChild(buttonTag);
        } else {
            cell.innerHTML = '-';
        }
    } else {
        cell.innerHTML = rowObj[columnObj.id];
        if (columnObj.type === 'date')
            cell.style.textAlign = 'right';
    }
    cell.className = columnObj.id;
    return cell;
}

//Configures hyperlink content of table cells
//Accepts link url and returns anchor tag
function setTableHyperlinkCell(href) {
    const anchorTag = createNewAnchorElement(href, true);
    anchorTag.innerHTML = 'See Post';
    anchorTag.style.textDecoration = 'underline';
    anchorTag.onmouseenter = function () {
        anchorTag.style.color = '#ffffff';
    }
    anchorTag.onmouseleave = function () {
        anchorTag.style.color = '#000000';
    }
    return anchorTag;
}

//Configures button inside table cells
function setTableButtonCell() {
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
    buttonTag.onclick = function () {
        alert("Applied Successfully!");
    }
    return buttonTag;
}

//Add event listener to tr of thead
//On click, identify target column and check if it is sortable 
const tableHeading = document.querySelector('#table-heading');
tableHeading.addEventListener('click', function (e) {
    const column = e.target;
    if (column.dataset.sortable === 'true' && (column.dataset.type === 'string' || column.dataset.type === 'number' || column.dataset.type === 'date')) {
        const isAscendingSort = determineSortType(column);
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
    let isAscendingSort = true;
    //Get all sortable columns
    const sortableColumns = document.querySelectorAll('[data-sortable="true"]');
    for (let sortableColumnObj of sortableColumns) {
        if (sortableColumnObj.id === column.id) {
            //Current column is the column to be sorted. Determine its sort type
            if (sortableColumnObj.innerHTML.match('sort-up')) {
                // Currently sorted in ascending order, changes sort type to descending order (isAscendingSort = false)
                sortableColumnObj.innerHTML = sortableColumnObj.innerHTML.replace('sort-up', 'sort-down');
                isAscendingSort = false;
            } else if (sortableColumnObj.innerHTML.match('sort-down')) {
                // Currently sorted in descending order, changes sort type to ascending order (isAscendingSort = true)
                sortableColumnObj.innerHTML = sortableColumnObj.innerHTML.replace('sort-down', 'sort-up');
            } else if (sortableColumnObj.innerHTML.match('sort')) {
                // Currently unsorted, sets sort type to ascending order (isAscendingSort = true) 
                sortableColumnObj.innerHTML = sortableColumnObj.innerHTML.replace('sort', 'sort-up');
            }
        }
        else {
            //Current column is not the column to be sorted so set its icon to 'sort' to indicate unsorted column
            sortableColumnObj.innerHTML = sortableColumnObj.innerHTML.replace('sort-up', 'sort');
            sortableColumnObj.innerHTML = sortableColumnObj.innerHTML.replace('sort-down', 'sort');
        }
    }
    return isAscendingSort;
}

//Function to sort rows based on column value
//Sorts elements of tableContent array
function sortRows(column, isAscendingSort) {
    if (column.dataset.type === 'number') {
        tableContent.sort((a, b) => isAscendingSort ? parseInt(a[column.id]) - parseInt(b[column.id]) : parseInt(b[column.id]) - parseInt(a[column.id]));
    } else {
        tableContent.sort((a, b) => {
            let x = a[column.id].toLowerCase();
            let y = b[column.id].toLowerCase();

            return isAscendingSort ? (x < y ? -1 : (x > y ? 1 : 0)) : (x < y ? 1 : (x > y ? -1 : 0));
        });
    }
    removeTableBodyRows();
    loadRows(tableContent);
}

//Function to remove current rows from table body
function removeTableBodyRows() {
    const tableBody = document.querySelector('#table-body');
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}