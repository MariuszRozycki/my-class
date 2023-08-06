/* imported functions */
import { getPosts } from "./getPosts.mjs";
import { createNewPost } from "./createNewPost.mjs";

/* imported URL */
import { postsUrl } from "../utils/api.mjs";

const path = location.pathname;
console.log(path);


const data = {
  "title": "New test title",
  "body": "New test body",
  "tags": [
    "strus"
  ],
  "media": "https://picsum.photos/200/300"
}

if (path === `/pages/feed/`) {
  getPosts(postsUrl);
} else if (path === `/pages/create-post/`) {
  // createNewPost(postsUrl, data);
}


