/**
 * Function registerUser registers user on Noroff API, based on given userData.
 * It uses url and endpoints from Noroff API documentation.
 * 
 * @param {*} url - url from Noroff API documentation.
 * @param {*} userData - userData from object user.
 * @returns {object} - It returns a JavaScript object, parsed from the JSON response from the API call.
 * The object returned will depend on the server's response.
 * 
 * @example
 * // Example usage:
 * const userName = document.querySelector('#userName').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const user = validateUser(userName, email, password);
    registerUser(registerUrl, user);
 */

export async function registerUser(url, userData) {
  console.log('url in registerUser:', url);

  const userRegisterFailure = document.querySelector('#user-not-registered');
  const userRegisterSuccess = document.querySelector('#user-registered');

  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }

    const response = await fetch(url, postData);
    const json = await response.json();
    console.log(json);// console.log --> remove before submitting

    if (response.ok) {
      userRegisterSuccess.classList.remove('d-none');
      userRegisterFailure.classList.add('d-none');
    }

    if (!response.ok) {
      const nameError = document.querySelector('.name-error');
      const emailError = document.querySelector('.email-error');
      const passwordError = document.querySelector('.password-error');

      const jsonErrors = json.errors;

      for (let error of jsonErrors) {
        let errorMessage = error.message;

        if (errorMessage.includes(`Only noroff.no emails are allowed to register`)) {
          errorMessage = `Email must contain @noroff.no or @stud.noroff.no`;
        }

        switch (true) {
          case error.message.includes("Name"):
            nameError.innerText = `Field can't be empty. ${error.message}`;
            nameError.classList.remove('d-none');
            break;
          case error.message.includes("email"):
            emailError.innerText = errorMessage;
            emailError.classList.remove('d-none');
            break;
          case error.message.includes("Password"):
            passwordError.innerText = error.message;
            passwordError.classList.remove('d-none');
            break;
          case error.message.includes("Profile"):
            userRegisterFailure.innerText = error.message;
            userRegisterFailure.classList.remove('d-none');
            userRegisterSuccess.classList.add('d-none');
        }
      }
    }

    return json;

  }
  catch (error) {
    console.error(error);
    throw error;
  }
}