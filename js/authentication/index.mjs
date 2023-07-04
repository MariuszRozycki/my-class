import { userToRegister } from "./login.mjs";

const loginButton = document.querySelector('button[type="submit"]');
loginButton.addEventListener('click', userToRegister);