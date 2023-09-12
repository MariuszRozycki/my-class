/**
 * Fetches and renders details of a single post based on the post ID in the query string.
 *
 * @async
 *
 * @example
 * Assuming the current URL is "http://example.com?ID=123"
 * This function will fetch and render the details of the post with the ID 123.
 * await renderPostDetails();
 */


import { authWithToken } from '../authentication/authWithToken.mjs';
import { baseApi } from '../utils/api.mjs';
import { renderPost } from './renderPost.mjs';

export async function renderPostDetails() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  const postByIdUrl = `${baseApi}/posts/${id}?_author=true&_reactions=true&_comments=true`;
  console.log(postByIdUrl);


  const method = 'GET';
  const data = await authWithToken(method, postByIdUrl);
  const json = data.json;

  renderPost([json]);
}