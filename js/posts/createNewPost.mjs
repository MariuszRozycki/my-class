/* import functions */
import { authWithToken } from "../authentication/authWithToken.mjs";
import { newPostData } from "./newPostData.mjs";
import { getPosts } from "./getPosts.mjs";

/* import Url */
import { postsUrl } from "../utils/api.mjs";

export async function createNewPost() {
  const method = 'POST';
  const newPostForm = document.querySelector('#new-post-form');

  if (!newPostForm.dataset.listenerAdded) {
    newPostForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const newTitle = document.querySelector('#new-title').value;
      const newTextContent = document.querySelector('#new-post-content').value;
      const newTag = document.querySelector('#new-tag').value;
      const newBanner = document.querySelector('#banner').value;

      const json = newPostData(newTitle, newTextContent, newTag, newBanner);
      console.log(json);

      try {
        await authWithToken(method, postsUrl, json);
        const cardContainer = document.querySelector('.card-container');
        cardContainer.innerHTML = '';
        getPosts();
      } catch (error) {

        throw error;
      }
    });

    newPostForm.dataset.listenerAdded = "true";
  }
}
