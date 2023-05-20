function togglePassword() {
  var passwordInput = document.getElementById('password');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

function handleRegistration(event) {
  event.preventDefault();

  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Check if username is already registered
  if (isUsernameRegistered(username)) {
    showError('Username is already registered. Please choose a different username.');
    return;
  }

  // Check if email is already registered
  if (isEmailRegistered(email)) {
    showError('Email is already registered. Please use a different email.');
    return;
  }

  // Check username length and format
  if (username.length < 5 || username.length > 15 || !/^[a-zA-Z0-9]+$/.test(username)) {
    showError('Invalid username. It must be between 5 and 15 characters long and can only contain alphanumeric characters.');
    return;
  }

  // Check password strength
  if (!isValidPassword(password)) {
    showError('Invalid password. It must have at least 8 characters, including at least one uppercase letter, one lowercase letter, one special character, and one number.');
    return;
  }

  // Perform registration and storage logic here
  // You can use local storage or send the data to a server for storage

  // For example, using local storage:
  var registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  var newUser = {
    username: username,
    email: email,
    password: password
  };
  registeredUsers.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

  alert('Registration successful. You can now login with your username.');

  // Redirect back to the login page
  window.location.href = 'login.html';
}

function isUsernameRegistered(username) {
  var registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  return registeredUsers.some(function(user) {
    return user.username.toLowerCase() === username.toLowerCase();
  });
}

function isEmailRegistered(email) {
  var registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  return registeredUsers.some(function(user) {
    return user.email.toLowerCase() === email.toLowerCase();
  });
}


function isValidPassword(password) {
  // Password regex pattern for minimum 8 characters, including at least one uppercase letter, one lowercase letter, one special character, and one number
  var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
}

function showError(message) {
  var errorElement = document.getElementById('error-message');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

var registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', handleRegistration);

var showPassword = document.getElementById('show-password');
showPassword.addEventListener('click', togglePassword);
