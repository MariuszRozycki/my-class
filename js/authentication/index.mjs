import { getDataFromAuthenticationForm } from "./login.mjs";

const loginButton = document.querySelector('button[type="submit"]');
loginButton.addEventListener('click', getDataFromAuthenticationForm);