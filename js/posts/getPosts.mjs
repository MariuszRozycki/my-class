/**
 * Fetches and displays posts using the GET method.
 *
 * @async
 * @throws Will display an error message and re-throw the error if any occurs.
 * Finishes when all posts are displayed.
 *
 * @example
 * getPosts().then(() => {
 *   console.log('Posts have been fetched and rendered.');
 * }).catch((error) => {
 *   console.error(`Failed to fetch and render posts: ${error}`);
 * });
 */


/* import functions */
import { authWithToken } from "../authentication/authWithToken.mjs";
import { renderPost } from "./renderPost.mjs";
import { displayError } from "../utils/displayError.mjs";

/* import url */
import { postsUrl } from "../utils/api.mjs";

export async function getPosts() {
  try {
    const method = 'GET'
    const data = await authWithToken(method, postsUrl);
    const json = data.json;

    renderPost(json);
  } catch (error) {
    displayError(error);
    throw error;
  }
}