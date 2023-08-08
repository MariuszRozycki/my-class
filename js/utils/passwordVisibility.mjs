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
