/* imported functions */
import { getPosts } from "./getPosts.mjs";
import { createPost } from "./createPost.mjs";

/* imported URL */
import { postsUrl } from "../utils/api.mjs";

const path = location.pathname;
console.log(path);

if (path === `/pages/feed/`) {
  getPosts(postsUrl);
} else if (path === `/pages/create-post/`) {
  createPost(postsUrl, data);
}


