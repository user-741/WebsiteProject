const form = document.querySelector('.login-form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const toggleButton = document.getElementById('toggle-button');
const toggleIcon = toggleButton.querySelector('i');
const submitButton = document.querySelector('.login-form__submit-btn');

toggleButton.addEventListener('click', function() {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.classList.remove('fas', 'fa-eye');
    toggleIcon.classList.add('fas', 'fa-eye-slash');
    toggleButton.setAttribute('aria-label', 'Hide password');
  } else {
    passwordInput.type = 'password';
    toggleIcon.classList.remove('fas', 'fa-eye-slash');
    toggleIcon.classList.add('fas', 'fa-eye');
    toggleButton.setAttribute('aria-label', 'Show password');
  }
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
  // Replace these values with your actual username and password
  const validEmail = 'user@example.com';
  const validPassword = 'pass';
  if (emailInput.value === validEmail && passwordInput.value === validPassword) {
    // Replace this with your actual login functionality
    form.reset();
    window.location.href = 'schedule.html';
  } else {
    alert('Incorrect username or password');
  }
});