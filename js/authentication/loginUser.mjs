/**
 * Logs in a user by sending a POST request to the given URL with the provided user data.
 * Stores the access token and user profile data in local storage.
 * Redirects to the feed page if login is successful, otherwise displays error messages.
 * 
 * @async
 * @function loginUser
 * @param {string} url - The URL for the login API endpoint.
 * @param {Object} userData - The user data containing email and password.
 * @returns {Promise<Object>} - A Promise that resolves to an object containing the JSON response from the API.
 * @throws Will throw an error if the fetch operation or any other operation fails.
 * 
 * @example  
 * // Example usage:
 * const url = 'https://api.example.com/login';
 * const userData = { email: 'user@example.com', password: 'password123' };
 * const result = await loginUser(url, userData);
 */

export async function loginUser(url, userData) {
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

    const accessToken = json.accessToken;
    localStorage.setItem('ACCESS_TOKEN', accessToken);

    const userProfileData = { ...json };
    delete userProfileData.accessToken;
    localStorage.setItem('USER_DATA', JSON.stringify(userProfileData));

    if (response.ok) {
      window.location.href = "../../pages/feed";
    }
    else {
      const emailError = document.querySelector('.email-error');
      const passwordError = document.querySelector('.password-error');

      const jsonErrors = json.errors;

      for (let error of jsonErrors) {
        let errorMessage = error.message;

        if (errorMessage.includes(`Email must be a valid email`)) {
          errorMessage = `Email must contain @noroff.no or @stud.noroff.no`;
        }

        switch (true) {
          case error.message.includes("email"):
            emailError.innerText = errorMessage;
            emailError.classList.remove('d-none');
            break;
          case error.message.includes("Password"):
            passwordError.innerText = error.message;
            passwordError.classList.remove('d-none');
            break;
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
