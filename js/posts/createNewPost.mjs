/* import functions */
import { authWithToken } from "../authentication/authWithToken.mjs";
import { newPostData } from "./newPostData.mjs";

/* import Url */
import { postsUrl } from "../utils/api.mjs";

export async function createNewPost() {
  const method = 'POST';
  const newPostForm = document.querySelector('#new-post-form');

  newPostForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newTitle = document.querySelector('#new-title').value;
    const newTextContent = document.querySelector('#new-post-content').value;
    const newTag = document.querySelector('#new-tag').value;
    const newBanner = document.querySelector('#banner').value;

    const json = newPostData(newTitle, newTextContent, newTag, newBanner);

    authWithToken(method, postsUrl, json);
  });
}