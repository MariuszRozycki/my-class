export async function getWithToken(url) {
  try {
    const token = localStorage.getItem('ACCESS_TOKEN');
    console.log(token);
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, fetchOptions);
    const json = await response.json();

    console.log(json);

  } catch (error) {
    console.log(error);
    throw error;
  }
}