/* import functions */
import { handlePasswordVisibility } from "../utils/passwordVisibility.mjs";
import { validateUser } from "./validateUser.mjs";
import { registerUser } from "./registerUser.mjs";
import { loginUser } from "./login.mjs";

/* import url */
import { baseApi } from "../utils/api.mjs";
import { registerUrl } from "../utils/api.mjs";
import { loginUrl } from "../utils/api.mjs";

window.onload = function () {
  handlePasswordVisibility();
};

const signUpButton = document.querySelector('#btn-sign-up');

if (signUpButton) {
  signUpButton.addEventListener('click', (e) => {
    e.preventDefault();

    const userName = document.querySelector('#userName').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const user = validateUser(userName, email, password);
    console.log('user:', user);
    registerUser(registerUrl, user);
  });
}



