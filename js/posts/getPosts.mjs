/* import functions */
import { authWithToken } from "../authentication/authWithToken.mjs";
import { renderPost } from "./renderPost.mjs";

/* import url */
import { postsUrl } from "../utils/api.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

export async function getPosts() {
  const method = 'GET'
  const json = await authWithToken(method, postsUrl);
  renderPost(json, id);
}