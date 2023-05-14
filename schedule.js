const addAppointmentForm = document.getElementById('appointment-form');
const appointmentsTableBody = document.querySelector('#browse-appointments table tbody');
const addAppointmentButton = document.getElementById('add-appointment-button');

// Load appointments from localStorage and restore them in the table
if (localStorage.getItem('appointments')) {
  const appointments = JSON.parse(localStorage.getItem('appointments'));
  appointments.forEach(function(appointment) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${appointment.date}</td>
      <td>${appointment.name}</td>
      <td>${appointment.fees}</td>
      <td>${appointment.time}</td>
      <td>${appointment.address}</td>
      <td>${appointment.type}</td>
      <td>${appointment.status}</td>
      <td>${appointment.phone}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;
    appointmentsTableBody.appendChild(row);
  });
}

// Add a new appointment to the table and save it to localStorage
addAppointmentButton.addEventListener('click', function(event) {
  event.preventDefault();

  // Get the form input values
  const dateInput = document.getElementById('date').value;
  const nameInput = document.getElementById('name').value;
  const feesInput = document.getElementById('fees').value;
  const timeInput = document.getElementById('time').value;
  const addressInput = document.getElementById('address').value;
  const typeInput = document.getElementById('type').value;
  const statusInput = document.getElementById('status').value;
  const phoneInput = document.getElementById('phone').value;

  // Create a new appointment object and add it to the table
  const appointment = {
    date: dateInput,
    name: nameInput,
    fees: feesInput,
    time: timeInput,
    address: addressInput,
    type: typeInput,
    status: statusInput,
    phone: phoneInput,
  };
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${dateInput}</td>
    <td>${nameInput}</td>
    <td>${feesInput}</td>
    <td>${timeInput}</td>
    <td>${addressInput}</td>
    <td>${typeInput}</td>
    <td>${statusInput}</td>
    <td>${phoneInput}</td>
    <td>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </td>
  `;
  appointmentsTableBody.appendChild(row);

  // Save the appointments data to localStorage
  let appointments = [];
  if (localStorage.getItem('appointments')) {
    appointments = JSON.parse(localStorage.getItem('appointments'));
  }
  appointments.push(appointment);
  localStorage.setItem('appointments', JSON.stringify(appointments));

  // Clear the form input fields
  addAppointmentForm.reset();
});


// Edit and delete button functionality
appointmentsTableBody.addEventListener('click', function(event) {
  const clickedElement = event.target;

  // Check if the clicked element is the edit button, and toggle the row's editable state
  if (clickedElement.classList.contains('edit-btn')) {
    const row = clickedElement.parentNode.parentNode;

    // Toggle the editable state of each td element in the row
    row.querySelectorAll('td').forEach(function(td) {
      td.setAttribute('contenteditable', true);
    });

    // Change the edit button to a save button
    clickedElement.classList.replace('edit-btn', 'save-btn');
    clickedElement.textContent = 'Save';
  }

  // Check if the clicked element is the save button, and save the edited data
  if (clickedElement.classList.contains('save-btn')) {
    const row = clickedElement.parentNode.parentNode;
    const date = row.querySelector('td:nth-child(1)').textContent;
    const name = row.querySelector('td:nth-child(2)').textContent;
    const fees = row.querySelector('td:nth-child(3)').textContent;
    const time = row.querySelector('td:nth-child(4)').textContent;
    const address = row.querySelector('td:nth-child(5)').textContent;
    const type = row.querySelector('td:nth-child(6)').textContent;
    const status = row.querySelector('td:nth-child(7)').textContent;
    const phone = row.querySelector('td:nth-child(8)').textContent;

    // Save the edited data to localStorage
    const appointments = JSON.parse(localStorage.getItem('appointments'));
    const rowIndex = Array.from(row.parentNode.children).indexOf(row);
    appointments[rowIndex] = { date, name, fees, time, address, type, status, phone };
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Toggle the editable state back to false, and change the save button back to edit
    row.querySelectorAll('td').forEach(function(td) {
      td.removeAttribute('contenteditable');
    });
    clickedElement.classList.replace('save-btn', 'edit-btn');
    clickedElement.textContent = 'Edit';
  }

  // Check if the clicked element is the delete button, and remove the row from the table and from localStorage
  if (clickedElement.classList.contains('delete-btn')) {
    const row = clickedElement.parentNode.parentNode;
    const rowIndex = Array.from(row.parentNode.children).indexOf(row);
    row.remove();

    const appointments = JSON.parse(localStorage.getItem('appointments'));
    appointments.splice(rowIndex, 1);
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }
});

// Get all the edit buttons in the document
const editButtons = document.querySelectorAll('.edit-btn');

// Add a click event listener to each edit button
editButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Get the current row and cells
    const currentRow = button.parentElement.parentElement;
    const currentCells = currentRow.querySelectorAll('td');

    // Store the current data in an object
    const data = {
      date: currentCells[0].innerText,
      name: currentCells[1].innerText,
      fees: currentCells[2].innerText,
      time: currentCells[3].innerText,
      address: currentCells[4].innerText,
      type: currentCells[5].innerText,
      status: currentCells[6].innerText,
      phone: currentCells[7].innerText,
    };

    // If the button contains the "Edit" text, switch to the "Save" button
    if (button.innerText === "Edit") {
      // Replace the edit button with a save button
      const saveButton = document.createElement('button');
      saveButton.classList.add('save-btn');
      saveButton.innerText = 'Save';
      button.parentElement.replaceChild(saveButton, button);

      // Show the edit form and update the input values
      editForm.style.display = 'block';
      const formInputs = editForm.querySelectorAll('input');
      formInputs[0].value = data.date;
      formInputs[1].value = data.name;
      formInputs[2].value = data.fees;
      formInputs[3].value = data.time;
      formInputs[4].value = data.address;
      formInputs[5].value = data.type;
      formInputs[6].value = data.status;
      formInputs[7].value = data.phone;
    }
    // If the button contains the "Save" text, switch back to the "Edit" button
    else {
      // Get the data from the form and update the current row
      const formInputs = editForm.querySelectorAll('input');
      currentCells[0].innerText = formInputs[0].value;
      currentCells[1].innerText = formInputs[1].value;
      currentCells[2].innerText = formInputs[2].value;
      currentCells[3].innerText = formInputs[3].value;
      currentCells[4].innerText = formInputs[4].value;
      currentCells[5].innerText = formInputs[5].value;
      currentCells[6].innerText = formInputs[6].value;
      currentCells[7].innerText = formInputs[7].value;

      // Replace the save button with an edit button
      const editButton = document.createElement('button');
      editButton.classList.add('edit-btn');
      editButton.innerText = 'Edit';
      button.parentElement.replaceChild(editButton, button);

      // Hide the edit form
      editForm.style.display = 'none';
    }
  });
});



// Only letters
function onlyLetters(event) {
  var input = event.target;
  var regex = /^[a-zA-Z]+$/;
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);

  if (!regex.test(key)) {
    event.preventDefault();
    return false;
  }
}

var nameInput = document.getElementById("name");
nameInput.addEventListener("keypress", onlyLetters);
