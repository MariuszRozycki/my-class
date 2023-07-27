export const userToLogIn = (email, password) => {
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
    "password": "",
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
  console.log(user);

  return user;
}