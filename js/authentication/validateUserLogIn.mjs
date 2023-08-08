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