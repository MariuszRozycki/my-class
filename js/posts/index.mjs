/* imported functions */
import { createNewPost } from "./createNewPost.mjs";
import { getPosts } from "./getPosts.mjs";
import { filterPosts } from "./filterPosts.mjs";
import { renderPostDetails } from "./renderPostDetails.mjs";
import { searchHandler } from "../utils/searchHandler.mjs";
import { updatePost } from "../../js/posts/updatePost.mjs";

/* imported Url */
import { postsUrl } from "../utils/api.mjs";

const path = location.pathname;
console.log(path);

if (path === `/pages/feed/`) {
  getPosts();
  filterPosts();
  createNewPost();
} else if (path === `/pages/create-post/`) {
  createNewPost();
} else if (path === `/pages/post-details/`) {
  renderPostDetails();
} else if (path === `/pages/update/`) {
  updatePost();
}

searchHandler(postsUrl);
