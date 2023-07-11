import { baseApi } from "../utils/api.mjs";
import { registerNoroffUser } from "./registration.mjs";
import { loginUrl } from "../utils/api.mjs";
import { loginUser } from "./login.mjs";

/**
 * function loginUser is a wrapper for norofUser
 * it is used here to help to call function noroffUser
 * with all parameters in file main.mjs
 */

// export const loginUser = () => {
const loginButton = document.querySelector('button[type="submit"]');
loginButton.addEventListener('click', e => {
  e.preventDefault();
  const nameValue = document.querySelector('#userName').value;
  const emailValue = document.querySelector('#email').value;
  const passwordValue = document.querySelector('#password').value;

  const user = registerNoroffUser(nameValue, emailValue, passwordValue);

  loginUser(loginUrl, user);
});
// }



