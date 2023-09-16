/* import functions */
import { createBodyJson } from "./createBodyJson.mjs";
import { displayError } from "../utils/displayError.mjs";

/**
 * Authenticates a request with a token and performs an HTTP request.
 *
 * @function authWithToken
 * @param {string} method - The HTTP method ('GET', 'PUT', 'POST', 'DELETE').
 * @param {string} url - The URL for the request, used to generate a token.
 * @param {Object} [data] - Optional data to be sent in the request body.
 * @returns {Promise<{json: Object, status: Object}>} - A Promise that resolves to an object containing the JSON response and status code.
 * @throws Will throw an error if the fetch operation or any other operation fails.
 *
 * @example
 * const method = 'GET';
 * const url = 'https://api.example.com/blablabla';
 * const data = { key: 'value' };
 * const result = await authWithToken(method, url, data);
 * const { json, status } = result;
 */

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
    displayError(error);
    throw error;
  }
}