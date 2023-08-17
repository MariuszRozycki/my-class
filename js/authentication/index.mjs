/* import functions */
import { handlePasswordVisibility } from "../utils/passwordVisibility.mjs";
import { registerUser } from "./registerUser.mjs";
import { validateUserRegister } from "./validateUserRegister.mjs";
import { validateUserLogIn } from "./validateUserLogIn.mjs";
import { loginUser } from "./loginUser.mjs";

/* import url */
import { registerUrl } from "../utils/api.mjs";
import { loginUrl } from "../utils/api.mjs";

const path = location.pathname;


export function registerAndLoginHandlers() {
  window.onload = function () {
    handlePasswordVisibility();
  };

  const registerForm = document.querySelector('#register-form');
  const logInForm = document.querySelector('#log-in-form');


  if (path === '/pages/register/') {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      const userName = document.querySelector('#userName').value;
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      const avatar = document.querySelector('#avatar').value;
      const banner = document.querySelector('#banner').value;
      const user = validateUserRegister(userName, email, password, avatar, banner);
      registerUser(registerUrl, user);
    });
  }

  if (path === '/') {
    logInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      const user = validateUserLogIn(email, password);
      console.log(user);
      loginUser(loginUrl, user);
    });
  }
}