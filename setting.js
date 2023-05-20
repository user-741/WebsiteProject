/* setting.js */

// Get the form elements
var fontSizeInput = document.getElementById('font-size');
var fontFamilySelect = document.getElementById('font-family');
var themeSelect = document.getElementById('theme');
var contrastInput = document.getElementById('contrast');

// Get the current settings from local storage, or set defaults
var fontSize = localStorage.getItem('fontSize') || '18';
var fontFamily = localStorage.getItem('fontFamily') || 'sans-serif';
var theme = localStorage.getItem('theme') || 'light';
var contrast = localStorage.getItem('contrast') || '5';

// Apply the current settings
document.body.style.fontSize = fontSize + 'px';
document.body.style.fontFamily = fontFamily;
document.body.classList.add('theme-' + theme);
document.body.classList.add('contrast-' + contrast);

// Update the form to reflect the current settings
fontSizeInput.value = fontSize;
fontFamilySelect.value = fontFamily;
themeSelect.value = theme;
contrastInput.value = contrast;

// Save the settings to local storage when the form is submitted
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  localStorage.setItem('fontSize', fontSizeInput.value);
  localStorage.setItem('fontFamily', fontFamilySelect.value);
  localStorage.setItem('theme', themeSelect.value);
  localStorage.setItem('contrast', contrastInput.value);
  
  applySettings();
});

// Function to apply the current settings
function applySettings() {
  var fontSize = localStorage.getItem('fontSize') || '18';
  var fontFamily = localStorage.getItem('fontFamily') || 'sans-serif';
  var theme = localStorage.getItem('theme') || 'light';
  var contrast = localStorage.getItem('contrast') || '5';
  
  // Apply the current settings to every HTML page
  var htmlList = document.querySelectorAll('html');
  for (var i = 0; i < htmlList.length; i++) {
    var html = htmlList[i];
    
    html.style.fontSize = fontSize + 'px';
    html.style.fontFamily = fontFamily;
    html.classList.add('theme-' + theme);
    html.classList.add('contrast-' + contrast);
  }
}