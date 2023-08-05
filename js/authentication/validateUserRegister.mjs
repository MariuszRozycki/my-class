/**
 * Creates a user object based on given name, email and password.
 * The function checks the name, email and password according to certain criteria.
 * If the name, email or password do not meet these criteria, an object with empty fields will be returned.
 *
 * @param {string} userName - The user name to be validated.
 * @param {string} email - The email to be validated.
 * @param {string} password - The password to be validated.
 * @returns {Object} An object containing 'email' and 'password'. If validation fails, these fields will be empty.
 *
 * @example
 * // Example usage:
 * const userName = document.querySelector('#userName').value;
 * const emailValue = document.querySelector('#email').value;
 * const passwordValue = document.querySelector('#password').value;
 * const user = validateUser(userName, email, password);
 * console.log(user);
 */

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

export function validateUserRegister(userName, email, password, avatar, banner) {
  let user = {
    "name": "",
    "email": "",
    "password": "",
    "avatar": "",
    "banner": ""
  }

  const nameError = document.querySelector('.name-error');
  const emailError = document.querySelector('.email-error');
  const passwordError = document.querySelector('.password-error');

  if (isValidName(userName)) {
    user.name = userName;
    nameError.classList.add('d-none');
  } else {
    nameError.classList.remove('d-none');
  }

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

  user.avatar = avatar ? avatar : "";
  user.banner = banner ? banner : "";


  return user;

}