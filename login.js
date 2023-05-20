var maxLoginAttempts = 3;
var loginAttemptInterval = 600000; // 10 minutes in milliseconds

function togglePassword() {
  var passwordInput = document.getElementById('password');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

function handleLogin(event) {
  event.preventDefault();

  var passwordInput = document.getElementById('password');

  // Check if the input fields are disabled
  if (passwordInput.disabled) {
    return;
  }

  var password = passwordInput.value;

  var loginAttempts = JSON.parse(sessionStorage.getItem('loginAttempts')) || {};
  var userAttempts = loginAttempts['user1'] || [];
  var now = new Date().getTime();

  // Check if the user is temporarily disabled due to too many failed attempts
  if (userAttempts.length >= maxLoginAttempts && now - userAttempts[userAttempts.length - maxLoginAttempts] < loginAttemptInterval) {
    var timeElapsed = now - userAttempts[userAttempts.length - maxLoginAttempts];
    var timeLeft = Math.ceil((loginAttemptInterval - timeElapsed) / 1000);

    if (timeLeft > 0) {
      showError('Too many failed login attempts. Please try again after ' + formatTime(timeLeft) + '.');
      startCountdown(timeLeft, 'user1');
      return;
    }
  }

  // Perform login validation
  if (isCredentialsValid(password)) {
    // Successful login
    resetLoginAttempts();
    window.location.href = 'schedule.html'; // Redirect to the main page
  } else {
    // Invalid credentials
    userAttempts.push(now);
    loginAttempts['user1'] = userAttempts;
    sessionStorage.setItem('loginAttempts', JSON.stringify(loginAttempts));

    if (userAttempts.length >= maxLoginAttempts) {
      showError('Too many failed login attempts. Please try again later.');
    } else {
      var attemptsLeft = maxLoginAttempts - userAttempts.length;
      showError('You have entered the wrong password. You have ' + attemptsLeft + ' more attempt(s).');
      shakeLoginForm();

      // Disable input fields after max login attempts
      if (attemptsLeft === 0) {
        passwordInput.disabled = true;
      }
    }
  }
}

function isCredentialsValid(password) {
  var registeredUsers = JSON.parse(sessionStorage.getItem('registeredUsers')) || [];
  return registeredUsers.some(function(user) {
    return user.password === password;
  });
}

function resetLoginAttempts() {
  sessionStorage.removeItem('loginAttempts');
}

function showError(message) {
  var errorElement = document.getElementById('error-message');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function shakeLoginForm() {
  var loginBox = document.querySelector('.login-box');
  loginBox.classList.add('shake');
  setTimeout(function() {
    loginBox.classList.remove('shake');
  }, 500);
}

function startCountdown(seconds, username) {
  var countdownElement = document.getElementById('countdown');

  var countdownTimer = setInterval(function() {
    seconds--;
    if (seconds <= 0) {
      countdownElement.textContent = '';
      clearInterval(countdownTimer);
      resetLoginAttempts();
    } else {
      countdownElement.textContent = 'Time Left: ' + formatTime(seconds);
    }
  }, 1000);
}

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;

  var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  var formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

  return formattedMinutes + ':' + formattedSeconds;
}

var loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', handleLogin);

var showPassword = document.getElementById('show-password');
showPassword.addEventListener('click', togglePassword);
