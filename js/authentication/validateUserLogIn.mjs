/**
 * Validates user login information based on email and password.
 * Updates the UI to display error messages if the validation fails.
 * 
 * @function validateUserLogIn
 * @param {string} email - The email address entered by the user.
 * @param {string} password - The password entered by the user.
 * @returns {Object} - An object containing the validated email and password. Empty strings if validation fails.
 * 
 * @example  
 * const email = 'user@noroff.no';
 * const password = 'password123';
 * const validatedUser = validateUserLogIn(email, password);
 */

const isValidEmail = email => {
  return email && (email.endsWith('@noroff.no') || email.endsWith('@stud.noroff.no'));
}

const isValidPassword = password => {
  return password && password.length >= 8;
}

export function validateUserLogIn(email, password) {
  let user = {
    "email": "",
    "password": "",
  }

  const emailError = document.querySelector('.email-error');
  const passwordError = document.querySelector('.password-error');

  if (isValidEmail(email)) {
    user.email = email;
    emailError.classList.add('d-none');
  } else {
    emailError.classList.remove('d-none');
  }

  if (isValidPassword(password)) {
    user.password = password;
    passwordError.classList.add('d-none');
  } else {
    passwordError.classList.remove('d-none');
  }

  return user;
}