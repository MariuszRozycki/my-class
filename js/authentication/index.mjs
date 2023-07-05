import { noroffUser } from "./login.mjs";

const loginButton = document.querySelector('button[type="submit"]');
loginButton.addEventListener('click', e => {
  e.preventDefault();
  const user = noroffUser();
  console.log(user);
});