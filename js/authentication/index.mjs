import { noroffUser } from "./login.mjs";

export const loginUser = () => {
  const loginButton = document.querySelector('button[type="submit"]');
  loginButton.addEventListener('click', e => {
    e.preventDefault();
    const emailValue = document.querySelector('#email').value;
    const passwordValue = document.querySelector('#password').value;
    const user = noroffUser(emailValue, passwordValue);
    console.log(user);
  });
}