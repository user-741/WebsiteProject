// Get elements
const profileInfo = document.querySelector('.profile-info');
const profileEdit = document.querySelector('.profile-edit');
const editButton = document.getElementById('edit-btn');
const saveButton = document.getElementById('save-btn');
const nameField = document.getElementById('name');
const businessNameField = document.getElementById('business_name');
const phoneNumberField = document.getElementById('phone_number');
const addressField = document.getElementById('address');
const abnField = document.getElementById('abn');
const bsbField = document.getElementById('bsb');
const accountNumberField = document.getElementById('account_number');
const accountNameField = document.getElementById('account_name');
const logoField = document.getElementById('logo');

// Check if profile data exists in local storage
let profileData = JSON.parse(localStorage.getItem('profileData'));

// Function to display profile information
function displayProfile() {
  if (profileData) {
    nameField.textContent = profileData.name;
    businessNameField.textContent = profileData.businessName;
    phoneNumberField.textContent = profileData.phoneNumber;
    addressField.textContent = profileData.address;
    abnField.textContent = profileData.abn;
    bsbField.textContent = profileData.bsb;
    accountNumberField.textContent = profileData.accountNumber;
    accountNameField.textContent = profileData.accountName;
    logoField.src = profileData.logo;
  }
}

// Function to enable editing profile
function enableEditing() {
  profileInfo.style.display = 'none';
  profileEdit.style.display = 'block';

  if (profileData) {
    document.getElementById('edit-name').value = profileData.name;
    document.getElementById('edit-business-name').value = profileData.businessName;
    document.getElementById('edit-phone-number').value = profileData.phoneNumber;
    document.getElementById('edit-address').value = profileData.address;
    document.getElementById('edit-abn').value = profileData.abn;
    document.getElementById('edit-bsb').value = profileData.bsb;
    document.getElementById('edit-account-number').value = profileData.accountNumber;
    document.getElementById('edit-account-name').value = profileData.accountName;
    document.getElementById('edit-logo').src = profileData.logo;
  }
}

// Function to save profile data
function saveProfileData(e) {
  e.preventDefault();

  const newProfileData = {
    name: document.getElementById('edit-name').value,
    businessName: document.getElementById('edit-business-name').value,
    phoneNumber: document.getElementById('edit-phone-number').value,
    address: document.getElementById('edit-address').value,
    abn: document.getElementById('edit-abn').value,
    bsb: document.getElementById('edit-bsb').value,
    accountNumber: document.getElementById('edit-account-number').value,
    accountName: document.getElementById('edit-account-name').value,
    logo: document.getElementById('edit-logo').src,
  };

  profileData = newProfileData;
  localStorage.setItem('profileData', JSON.stringify(profileData));

  displayProfile();

  profileInfo.style.display = 'block';
  profileEdit.style.display = 'none';
}

// Event listeners
if (editButton) {
  editButton.addEventListener('click', enableEditing);
}

if (saveButton) {
  saveButton.addEventListener('click', saveProfileData);
}

// Display profile on page load
window.addEventListener('DOMContentLoaded', displayProfile);
