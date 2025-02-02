const inputAddTask = addTaskForm.addTask;
const tableBody = document.querySelector('table tbody');
const tableRows = document.querySelectorAll('table tbody tr');
const stateTask = document.getElementById('#stateTask');
const msgError = document.querySelector('.messageError');
const multiRemoveError = document.querySelector('.multiRemoveError');

let checkboxTask = [];
let selectTask = [];
let idTableRow = 0;
let arrayIdTableRow = []; // save all id (even if there are deleted)

function createTaskComponent(id, inputValue) {
    const tableRow = document.createElement('tr');
    tableRow.setAttribute('id', `tr${id}`);

    const tableCell1 = document.createElement('td');
    const tableCell2 = document.createElement('td');
    const paragraph = document.createElement('p');
    const tableCell3 = document.createElement('td');
    const tableCell4 = document.createElement('td');

    const selectStateTask = document.createElement('select');
    selectStateTask.setAttribute('name', 'stateTask');
    selectStateTask.setAttribute('id', `select${id}`);
    selectStateTask.setAttribute('onchange', `statusTask(${id})`);
    selectStateTask.innerHTML = '<option value="waiting">---</option> <option value="progress">En cours</option> <option value="finished">Terminée</option>';

    tableCell1.innerHTML = `<input type="checkbox" name="task${id}" id="${id}">`;
    paragraph.textContent = inputValue;
    tableCell2.appendChild(paragraph);
    tableCell3.appendChild(selectStateTask);
    tableCell4.innerHTML = `<button onclick="removeOneTaskBtn(${id})" type="button" id="${id}">Supprimer</button>`;

    tableRow.appendChild(tableCell1);
    tableRow.appendChild(tableCell2);
    tableRow.appendChild(tableCell3);
    tableRow.appendChild(tableCell4);
    tableBody.appendChild(tableRow);
}

// Get the same elements from the tasks row
function getElements(selector, array) {
    let nodeListFromArray = Array.from(selector);
    array.pop(nodeListFromArray);
    array.push(nodeListFromArray); // Each time a task is created, delete the old ones to add all the tasks present in the to do list
}

// On button click, add task
function addTaskBtn() {
    let inputValue = inputAddTask.value; // input value in new variable
    inputAddTask.value = ""; // remove input value (original)
    
    if(inputValue.length > 0) {
        // create task row
        createTaskComponent(idTableRow, inputValue);
        arrayIdTableRow.push(idTableRow);
        idTableRow++;

        // get checkbox - remove all tasks selected on click
        getElements(document.querySelectorAll('tbody tr td input[type=checkbox]'), checkboxTask);

        // get select - remove all tasks finised on click
        getElements(document.querySelectorAll('tbody tr td select'), selectTask);

        // Message error
        msgError.style.padding = '0';
        msgError.innerText = '';
        multiRemoveError.innerText = '';
    } else {
        msgError.style.padding = '.25rem 1rem';
        msgError.innerText = 'Entrez le nom de votre tâche';
    }
}

// Remove one task on button click
function removeOneTaskBtn(id) {
    let tableRow = document.querySelector(`#tr${id}`);
    tableRow.remove();
}

function multiRemoveTasksBtn() {
    const flatCheckboxTask = checkboxTask.flat();

    for (let id = 0; id < flatCheckboxTask.length; id++) {
        let checkboxRowChecked = flatCheckboxTask[id].checked;
        
        if(checkboxRowChecked) {
            let tableRow = document.querySelector(`#tr${id}`);
            tableRow.remove();

            flatCheckboxTask[id].checked = false;
        }
    }
    
    if(flatCheckboxTask.length === 0) {
        multiRemoveError.innerText = 'Aucune tâche à supprimer';
    }
}

function statusTask(id) {
    let tableRow = document.querySelector(`#tr${id}`);
    let select = document.querySelector(`#select${id}`);

    if(select.value === 'progress') {
        tableRow.style.backgroundColor = 'orange';
    } else if(select.value === 'finished') {
        tableRow.style.backgroundColor = '#00d600';
    } else {
        tableRow.style.backgroundColor = 'white';
    }
}

function removeFinishedTasksBtn() {
    const flatSelectTask = selectTask.flat();
    console.log('-----');

    for (let i = 0; i < flatSelectTask.length; i++) {
        let selectStatus = flatSelectTask[i].value;
        let tableRow = document.querySelector(`#tr${i}`);

        //console.log('List : ' + i);
        
        if(selectStatus === 'finished' && tableRow) {
            console.log('ID : ' + i);
            
            tableRow.remove();
        }
    }
    
    if(flatSelectTask.length === 0) {
        multiRemoveError.innerText = 'Aucune tâche à supprimer';
    }

    console.log(flatSelectTask);
    console.log('-----');
}