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

    // const accessToken = json.accessToken;
    // localStorage.setItem('ACCESS_TOKEN', accessToken);

    // const userProfileData = { ...json };
    // delete userProfileData.accessToken;
    // localStorage.setItem('USER_DATA', JSON.stringify(userProfileData));

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
