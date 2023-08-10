/* import functions */
import { authWithToken } from "../authentication/authWithToken.mjs";
import { renderPost } from "./renderPost.mjs";

/* import url */
import { postsUrl } from "../utils/api.mjs";

export async function getPosts() {
  const method = 'GET'
  const json = await authWithToken(method, postsUrl);
  renderPost(json);
}