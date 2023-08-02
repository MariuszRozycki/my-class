/* import functions */
import { handlePasswordVisibility } from "../utils/passwordVisibility.mjs";
import { registerUser } from "./registerUser.mjs";
import { validateUserRegister } from "./validateUserRegister.mjs";
import { validateUserLogIn } from "./validateUserLogIn.mjs";
import { getWithToken } from "./getWithToken.mjs";
import { loginUser } from "./login.mjs";

/* import url */
import { registerUrl } from "../utils/api.mjs";
import { loginUrl } from "../utils/api.mjs";
import { getAllProfiles } from "../utils/api.mjs";

window.onload = function () {
  handlePasswordVisibility();
};

const signUpButton = document.querySelector('#btn-sign-up');
const logInButton = document.querySelector('#btn-log-in');

if (signUpButton) {
  signUpButton.addEventListener('click', e => {
    e.preventDefault();

    const userName = document.querySelector('#userName').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const user = validateUserRegister(userName, email, password);
    console.log('user:', user);
    registerUser(registerUrl, user);
  });
}

if (logInButton) {
  logInButton.addEventListener('click', (e) => {
    // e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const user = validateUserLogIn(email, password);
    loginUser(loginUrl, user);
  })
}


