/* imported functions */
import { createNewPost } from "./createNewPost.mjs";
import { getPosts } from "./getPosts.mjs";
import { filterPost } from "./filterPosts.mjs";

const path = location.pathname;
console.log(path);

if (path === `/pages/feed/`) {
  getPosts();
  filterPost();
} else if (path === `/pages/create-post/`) {
  createNewPost();
}


