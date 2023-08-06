export async function createNewPost(url, data) {
  try {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(url, fetchOptions);
    const json = await response.json();

    console.log(json);


    console.log(json);

    return json;

  } catch (error) {
    console.log(error);
    throw error;
  }
}





