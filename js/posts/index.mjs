/* imported functions */
import { createNewPost } from "./createNewPost.mjs";
import { getPosts } from "./getPosts.mjs";

const path = location.pathname;
console.log(path);

if (path === `/pages/feed/`) {
  getPosts();
} else if (path === `/pages/create-post/`) {
  createNewPost();
}


