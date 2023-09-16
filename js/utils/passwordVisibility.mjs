/**
* Function handlePasswordVisibility toggles the visibility of a password input field.
* When the password toggle button is clicked, the function changes the input type between 'password' and 'text'.
* It also updates the icon on the toggle button to indicate the current state.
* 
* @function handlePasswordVisibility
* 
* @example
* handlePasswordVisibility();
*/

export function handlePasswordVisibility() {
  const passwordField = document.querySelector('#password');
  const passwordToggle = document.querySelector('.password-toggle');

  passwordToggle.addEventListener('click', function () {
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      passwordToggle.classList.remove('fa-eye');
      passwordToggle.classList.add('fa-eye-slash');
    } else {
      passwordField.type = 'password';
      passwordToggle.classList.remove('fa-eye-slash');
      passwordToggle.classList.add('fa-eye');
    }
  });
}