// Add Button
// When the "Add" button is clicked, collect the input values from the form and add a new row with the entered data to the table.
document.getElementById("add-appointment-button").addEventListener("click", function() {
  // Retrieve input values
  var date = document.getElementById("date").value;
  var name = document.getElementById("name").value;
  var fees = document.getElementById("fees").value;
  var time = document.getElementById("time").value;
  var address = document.getElementById("address").value;
  var type = document.getElementById("type").value;
  var status = document.getElementById("status").value;
  var phone = document.getElementById("phone").value;

  // Create a new row in the table with the entered data
  var table = document.querySelector("#browse-appointments table tbody");
  var newRow = table.insertRow();
  newRow.innerHTML = `
    <td>${date}</td>
    <td>${name}</td>
    <td>${fees}</td>
    <td>${time}</td>
    <td>${address}</td>
    <td>${type}</td>
    <td>${status}</td>
    <td>${phone}</td>
    <td>
      <button class="edit-button">Edit</button>
      <button class="delete-button">Delete</button>
    </td>
  `;

  // Clear input fields after adding a new row
  document.getElementById("date").value = "";
  document.getElementById("name").value = "";
  document.getElementById("fees").value = "";
  document.getElementById("time").value = "";
  document.getElementById("address").value = "";
  document.getElementById("phone").value = "";
});

// Search Feature
// When the "Search" button is clicked, filter the table rows based on the entered search term
document.getElementById("search-button").addEventListener("click", function() {
  var searchInput = document.getElementById("search").value.toLowerCase();
  var tableRows = document.querySelectorAll("#browse-appointments table tbody tr");

  tableRows.forEach(function(row) {
    var name = row.cells[1].textContent.toLowerCase();
    var phone = row.cells[7].textContent.toLowerCase();
    var address = row.cells[4].textContent.toLowerCase();
    var date = row.cells[0].textContent.toLowerCase();

    if (
      name.includes(searchInput) ||
      phone.includes(searchInput) ||
      address.includes(searchInput) ||
      date.includes(searchInput)
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});


// Clear Feature
// When the "Clear" button is clicked, clear the search input and display all table rows
document.getElementById("clear-button").addEventListener("click", function() {
  document.getElementById("search").value = "";
  var tableRows = document.querySelectorAll("#browse-appointments table tbody tr");
  tableRows.forEach(function(row) {
    row.style.display = "";
  });
});

// Sort Feature
// When the "Sort" button is clicked, sort the table rows based on the selected sort option
// Get references to the required elements
const sortSelect = document.getElementById('sort-select');
const sortButton = document.getElementById('sort-button');
const appointmentTable = document.querySelector('#browse-appointments table tbody');

// Function to sort the table rows based on the selected sort option
function sortAppointments() {
  const sortValue = sortSelect.value;

  // Convert the HTMLCollection to an array to make sorting easier
  const rows = Array.from(appointmentTable.rows);

  rows.sort((a, b) => {
    const aValue = a.cells[getColumnIndex(sortValue)].textContent.toLowerCase();
    const bValue = b.cells[getColumnIndex(sortValue)].textContent.toLowerCase();

    return sortValue.includes('asc') ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  });

  // Clear the table body
  appointmentTable.innerHTML = '';

  // Append the sorted rows back to the table body
  rows.forEach(row => appointmentTable.appendChild(row));
}

// Helper function to get the column index based on the sort value
function getColumnIndex(sortValue) {
  const sortKey = sortValue.split('-')[0];

  switch (sortKey) {
    case 'date':
      return 0;
    case 'name':
      return 1;
    case 'fees':
      return 2;
    case 'time':
      return 3;
    case 'address':
      return 4;
    case 'type':
      return 5;
    case 'status':
      return 6;
    case 'phone':
      return 7;
    default:
      return 0;
  }
}

// Attach event listener to the sort button
sortButton.addEventListener('click', sortAppointments);



// Save/Edit/Delete Feature
// Add event listeners to the table for the Save, Edit, and Delete buttons
document.querySelector("#browse-appointments table").addEventListener("click", function(event) {
  var target = event.target;
  var row = target.closest("tr");

  // Edit Button
  if (target.classList.contains("edit-button")) {
    var cells = row.cells;

    // Enable editing of the row cells
    for (var i = 0; i < cells.length - 1; i++) {
      cells[i].setAttribute("contenteditable", "true");
    }

    // Change the Edit button to a Save button
    target.textContent = "Save";
    target.classList.remove("edit-button");
    target.classList.add("save-button");

    // Disable editing for other rows
    var tableRows = document.querySelectorAll("#browse-appointments table tbody tr");
    tableRows.forEach(function(row) {
      if (row !== target.closest("tr")) {
        var cells = row.cells;
        for (var i = 0; i < cells.length - 1; i++) {
          cells[i].setAttribute("contenteditable", "false");
        }
      }
    });
  }

  // Save Button
  else if (target.classList.contains("save-button")) {
    var cells = row.cells;

    // Disable editing of the row cells
    for (var i = 0; i < cells.length - 1; i++) {
      cells[i].setAttribute("contenteditable", "false");
    }

    // Change the Save button back to an Edit button
    target.textContent = "Edit";
    target.classList.remove("save-button");
    target.classList.add("edit-button");
  }

  // Delete Button
  else if (target.classList.contains("delete-button")) {
    row.remove();
  }
});

// Store Data in Local Storage
// Before the page unloads, save the table data in local storage
window.addEventListener("beforeunload", function() {
  var tableRows = document.querySelectorAll("#browse-appointments table tbody tr");
  var data = [];

  tableRows.forEach(function(row) {
    var rowData = {
      date: row.cells[0].textContent,
      name: row.cells[1].textContent,
      fees: row.cells[2].textContent,
      time: row.cells[3].textContent,
      address: row.cells[4].textContent,
      type: row.cells[5].textContent,
      status: row.cells[6].textContent,
      phone: row.cells[7].textContent
    };
    data.push(rowData);
  });

  localStorage.setItem("appointmentData", JSON.stringify(data));
});

// Load Data from Local Storage
// When the page loads, retrieve the table data from local storage and populate the table
window.addEventListener("load", function() {
  var data = JSON.parse(localStorage.getItem("appointmentData"));

  if (data) {
    var table = document.querySelector("#browse-appointments table tbody");

    data.forEach(function(rowData) {
      var newRow = table.insertRow();
      newRow.innerHTML = `
        <td>${rowData.date}</td>
        <td>${rowData.name}</td>
        <td>${rowData.fees}</td>
        <td>${rowData.time}</td>
        <td>${rowData.address}</td>
        <td>${rowData.type}</td>
        <td>${rowData.status}</td>
        <td>${rowData.phone}</td>
        <td>
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
          </td>
        `;
      });
    }
  });
  

