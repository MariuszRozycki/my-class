/* import functions */
import { createBodyJson } from "./createBodyJson.mjs";

export async function authWithToken(method, url, data) {
  try {
    const token = localStorage.getItem('ACCESS_TOKEN');
    let body = createBodyJson(method, data);

    const fetchOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body
    };

    const response = await fetch(url, fetchOptions);
    const json = await response.json();

    return {
      json: json,
      status: response.json
    };

  } catch (error) {
    throw error;

  }
}
