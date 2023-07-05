export const noroffUser = () => {
  const emailValue = document.querySelector('#email').value;
  const passwordValue = document.querySelector('#password').value;
  const emailError = document.querySelector('.email-error');
  const passwordError = document.querySelector('.password-error');

  const isValidEmail = email => {
    return email && (email.endsWith('@noroff.no') || email.endsWith('@stud.noroff.no'));
  }

  const isValidPassword = password => {
    return password && password.length >= 8;
  }

  let user = {
    "email": "",
    "password": ""
  }

  if (isValidEmail(emailValue)) {
    user.email = emailValue;
    emailError.classList.add('d-none');
  }

  else if (!(isValidEmail(emailValue))) {
    emailError.classList.remove('d-none');
  }

  if (isValidPassword(passwordValue)) {
    user.password = passwordValue;
    passwordError.classList.add('d-none');
  }

  else if (!(isValidPassword(passwordValue))) {
    passwordError.classList.remove('d-none');
  }
  return user;
}