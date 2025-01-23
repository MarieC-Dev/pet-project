const inputAddTask = addTaskForm.addTask;
const tableBody = document.querySelector('table tbody');
const tableRows = document.querySelectorAll('table tbody tr');
const stateTask = document.getElementById('#stateTask');
const msgError = document.querySelector('.messageError');
const multiRemoveError = document.querySelector('.multiRemoveError');

let checkboxTask = [];

function addTaskBtn() {
    let inputValue = inputAddTask.value; // input value in new variable
    let nbChildTableBody = tableBody.childElementCount;
    inputAddTask.value = ""; // remove input value (original)
    
    if(inputValue.length > 0) {
        // create task row
        const tableRow = document.createElement('tr');
        tableRow.setAttribute('id', `tr${nbChildTableBody}`);

        const tableCell1 = document.createElement('td');
        const tableCell2 = document.createElement('td');
        const paragraph = document.createElement('p');
        const tableCell3 = document.createElement('td');
        const tableCell4 = document.createElement('td');

        const selectStateTask = document.createElement('select');
        selectStateTask.setAttribute('name', 'stateTask');
        selectStateTask.setAttribute('id', 'stateTask');
        selectStateTask.innerHTML = '<option value="waiting">En attente</option> <option value="progress">En cours</option> <option value="finished">Terminée</option>';

        tableCell1.innerHTML = `<input type="checkbox" name="task${nbChildTableBody}" id="${nbChildTableBody}">`;
        paragraph.textContent = inputValue;
        tableCell2.appendChild(paragraph);
        tableCell3.appendChild(selectStateTask);
        tableCell4.innerHTML = `<button onclick="removeOneTaskBtn(${nbChildTableBody})" type="button" id="${nbChildTableBody}">Supprimer</button>`;

        tableRow.appendChild(tableCell1);
        tableRow.appendChild(tableCell2);
        tableRow.appendChild(tableCell3);
        tableRow.appendChild(tableCell4);
        tableBody.appendChild(tableRow);

        // get checkbox element and push it in array 'checkboxTask'
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

function removeOneTaskBtn(id) {
    const idTableRow = document.querySelector(`#tr${id}`);
    idTableRow.remove();
}

function multiRemoveTaskBtn() {
    const flatcheckboxTask = checkboxTask.flat();

    for (let id = 0; id < flatcheckboxTask.length; id++) {
        const checkboxRowChecked = flatcheckboxTask[id].checked;

        if(checkboxRowChecked) {
            const idTableRow = document.querySelector(`#tr${id}`);
            idTableRow.remove();
            
            multiRemoveError.innerText = '';
        } else {
            multiRemoveError.innerText = 'Sélectionnez une ou plusieurs tâches à supprimer';
        }
    }

    if(flatcheckboxTask.length === 0) {
        multiRemoveError.innerText = 'Aucune tâche à supprimer';
    }
}
