export async function loginUser(url, userData) {
  console.log(url, userData);
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
    console.log(json);

  }
  catch (error) {
    console.log(error);
  }
}

