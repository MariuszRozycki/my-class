/* imported functions */
import { createNewPost } from "./createNewPost.mjs";
import { getPosts } from "./getPosts.mjs";
import { filterPosts } from "./filterPosts.mjs";
import { renderPostDetails } from "./renderPostDetails.mjs";

const path = location.pathname;
console.log(path);

if (path === `/pages/feed/`) {
  getPosts();
  filterPosts();
} else if (path === `/pages/create-post/`) {
  createNewPost();
} else if (path === `/pages/post-details/`) {
  renderPostDetails();
}


