/* import functions */
import { createBodyJson } from "./createBodyJson.mjs";
import { displayError } from "../utils/displayError.mjs";

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
    console.log(response);
    const json = await response.json();
    // console.log(json);

    return {
      json: json,
      status: response.json
    };

  } catch (error) {
    displayError();
    throw error;

  }
}
