export function validateNewPost(userName, email, password, avatar, banner) {
  let user = {
    "title": "string",
    "body": "string",
    "tags": [
      "string"
    ],
    "media": "string"
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