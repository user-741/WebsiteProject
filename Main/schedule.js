// Wait for DOM to Load
window.addEventListener('DOMContentLoaded', function() {
  // Global Variables
  const appointments = [];

  // Add Appointment
  const addForm = document.getElementById('add-form');
  const instructorInput = document.getElementById('instructor');
  const studentInput = document.getElementById('student');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  const addButton = document.getElementById('add-button');

  addButton.addEventListener('click', function(event) {
    // Prevent Default Form Behavior
    event.preventDefault();

    // Create Appointment Object
    const appointment = {
      instructor: instructorInput.value,
      student: studentInput.value,
      date: dateInput.value,
      time: timeInput.value
    };

    // Add Appointment to Array
    appointments.push(appointment);

    // Clear Form Inputs
    instructorInput.value = '';
    studentInput.value = '';
    dateInput.value = '';
    timeInput.value = '';

    // Update Appointments List
    updateAppointmentsList();
  });

  // Update Appointments List
  function updateAppointmentsList() {
    const appointmentList = document.getElementById('appointment-list');

    // Clear List HTML
    appointmentList.innerHTML = '';

    // Loop Through Appointments Array
    for (const appointment of appointments) {
      // Create Appointment HTML
      const appointmentHTML = `
        <li>${appointment.instructor} will teach ${appointment.student} on ${appointment.date} at ${appointment.time}.</li>
      `;

      // Add Appointment HTML to List
      appointmentList.innerHTML += appointmentHTML;
    }
  }

  // Browse Appointments
  const browseForm = document.getElementById('browse-form');
  const searchInput = document.getElementById('search');
  const browseTable = document.getElementById('browse-table');

  browseForm.addEventListener('submit', function(event) {
    // Prevent Default Form Behavior
    event.preventDefault();

    // Clear Table Rows
    browseTable.innerHTML = '';

    // Loop Through Appointments Array
    for (const appointment of appointments) {
      // Check for Search Match
      if (appointment.instructor.toLowerCase().includes(searchInput.value.toLowerCase()) || 
          appointment.student.toLowerCase().includes(searchInput.value.toLowerCase())) {
        // Create Table Rows
        const tableHTML = `
          <tr>
            <td>${appointment.instructor}</td>
            <td>${appointment.student}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td class="actions"><button class="delete" data-index="${appointments.indexOf(appointment)}">Delete</button></td>
          </tr>
        `;

        // Add Table Rows to Table
        browseTable.innerHTML += tableHTML;
      }
    }


    const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', () => {
  window.location.href = 'login.html';
});
  });

  // Delete Appointment
  browseTable.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
      // Get Appointment Index
      const index = event.target.getAttribute('data-index');

      // Remove Appointment from Array
      appointments.splice(index, 1);

      // Update Appointments List
      updateAppointmentsList();

      // Update Browse Appointments Table
      browseForm.dispatchEvent(new Event('submit'));
    }
  });
});


const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});