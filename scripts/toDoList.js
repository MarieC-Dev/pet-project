const inputAddTask = addTaskForm.addTask;
const tableBody = document.querySelector('table tbody');
const tableRows = document.querySelectorAll('table tbody tr');
const stateTask = document.getElementById('#stateTask');
const msgError = document.querySelector('.messageError');
const multiRemoveError = document.querySelector('.multiRemoveError');

let checkboxTask = [];
let idTableRow = 0;
let saveId = idTableRow;

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
    selectStateTask.setAttribute('id', 'stateTask');
    selectStateTask.innerHTML = '<option value="waiting">En attente</option> <option value="progress">En cours</option> <option value="finished">Terminée</option>';

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

    id++;   
}

function addTaskBtn() {
    let inputValue = inputAddTask.value; // input value in new variable
    inputAddTask.value = ""; // remove input value (original)
    
    if(inputValue.length > 0) {
        // create task row
        createTaskComponent(idTableRow, inputValue);

        // multiRemove : get checkbox element and push it in array 'checkboxTask'
        // convert NodeList to real array and flat it
        let checkbox = document.querySelectorAll('tbody tr td input');
        let nodeListFromArray = Array.from(checkbox);
        checkboxTask.pop(nodeListFromArray);
        checkboxTask.push(nodeListFromArray);     

        // Message error
        msgError.style.padding = '0';
        msgError.innerText = '';
        multiRemoveError.innerText = '';
    } else {
        msgError.style.padding = '.25rem 1rem';
        msgError.innerText = 'Entrez le nom de votre tâche';
    }
}

console.log(idTableRow);


function removeOneTaskBtn(id) {
    let tableRow = document.querySelector(`#tr${id}`);
    tableRow.remove();

    idTableRow = saveId;
    console.log(idTableRow);
}

function multiRemoveTaskBtn() {
    const flatcheckboxTask = checkboxTask.flat();

    for (let id = 0; id < flatcheckboxTask.length; id++) {
        const checkboxRowChecked = flatcheckboxTask[id].checked;

        if(checkboxRowChecked) {
            const tableRow = document.querySelector(`#tr${id}`);
            tableRow.remove();
            
            multiRemoveError.innerText = '';
        } else {
            multiRemoveError.innerText = 'Sélectionnez une ou plusieurs tâches à supprimer';
        }
    }

    idTableRow = saveId;
    console.log(idTableRow);

    if(flatcheckboxTask.length === 0) {
        multiRemoveError.innerText = 'Aucune tâche à supprimer';
    }
}
