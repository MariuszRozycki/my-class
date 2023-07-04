// In function isValidEmail 'email &&' is chcecking 
// if email isn't empty string or null or undefined
export const userToRegister = () => {
  const emailValue = document.querySelector('#email').value;
  const loginError = document.querySelector('.login-error');

  const isValidEmail = (email) => {
    return email && (email.endsWith('@noroff.no') || email.endsWith('@stud.noroff.no'));
  }

  if (isValidEmail(emailValue)) {
    loginError.classList.add('d-none');
  }
  else {
    loginError.classList.remove('d-none');
  }
}



