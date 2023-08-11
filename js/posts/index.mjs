/* imported functions */
import { createNewPost } from "./createNewPost.mjs";
import { getPosts } from "./getPosts.mjs";
import { filterPosts } from "./filterPosts.mjs";

const path = location.pathname;
console.log(path);

if (path === `/pages/feed/`) {
  getPosts();
  filterPosts();
} else if (path === `/pages/create-post/`) {
  createNewPost();
}


