/**
 * Creates a user object based on given email and password.
 * The function checks the email and password according to certain criteria.
 * If the email or password do not meet these criteria, an object with empty fields will be returned.
 *
 * @param {string} email - The email to be validated.
 * @param {string} password - The password to be validated.
 * @returns {Object} An object containing 'email' and 'password'. If validation fails, these fields will be empty.
 *
 * @example
 * // Example usage:
 * const emailValue = document.querySelector('#email').value;
 * const passwordValue = document.querySelector('#password').value;
 * const user = noroffUser(emailValue, passwordValue);
 * console.log(user);
 */

export const registerNoroffUser = (email, password) => {
  const nameError = document.querySelector('.name-error');
  console.log(nameError);
  const emailError = document.querySelector('.email-error');
  const passwordError = document.querySelector('.password-error');

  const isValidName = userName => {
    const regex = /^[A-Za-z0-9_]+$/;
    return userName && regex.test(userName);
  }

  const isValidEmail = email => {
    return email && (email.endsWith('@noroff.no') || email.endsWith('@stud.noroff.no'));
  }

  const isValidPassword = password => {
    return password && password.length >= 8;
  }

  let user = {
    "name": "",
    "email": "",
    "password": "",
  }

  if (isValidName(userName)) {
    user.name = userName;
    nameError.classList.add('d-none');
  }
  else if (!(isValidName(userName))) {
    nameError.classList.remove('d-none');
  }

  if (isValidEmail(email)) {
    user.email = email;
    emailError.classList.add('d-none');
  }
  else if (!(isValidEmail(email))) {
    emailError.classList.remove('d-none');
  }

  if (isValidPassword(password)) {
    user.password = password;
    passwordError.classList.add('d-none');
  }
  else if (!(isValidPassword(password))) {
    passwordError.classList.remove('d-none');
  }

  return user;
}