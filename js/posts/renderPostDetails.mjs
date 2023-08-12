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
  const json = await authWithToken(method, postByIdUrl);
  console.log('json in renderPostDetails():', json);

  renderPost([json]);

}