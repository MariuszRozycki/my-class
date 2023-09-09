/**
 * Function createNewPost submits a new post to the API.
 * It reads values from a form, creates a new post object and sends it using POST method.
 * After the post is successfully created, it clears the form fields.
 * 
 * @async
 * @throws {Error} Throws an error if the API call is unsuccessful.
 * 
 * @example
 * // Usage of createNewPost function
 * createNewPost();
 */


/* import functions */
import { authWithToken } from "../authentication/authWithToken.mjs";
import { postData } from "./postData.mjs";
import { getPosts } from "./getPosts.mjs";

/* import Url */
import { postsUrl } from "../utils/api.mjs";

export async function createNewPost() {
  const method = 'POST';
  const newPostForm = document.querySelector('#new-post-form');
  const sectionPosts = document.querySelector('.posts');

  if (!newPostForm.dataset.listenerAdded) {
    newPostForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      sectionPosts.classList.remove('hidden');

      const newTitle = document.querySelector('#new-title');
      const newTextContent = document.querySelector('#new-post-content');
      const newTag = document.querySelector('#new-tag');
      const newBanner = document.querySelector('#banner');

      const newTitleValue = newTitle.value;
      const newTextContentValue = newTextContent.value;
      const newTagValue = newTag.value;
      const newBannerValue = newBanner.value;

      const json = postData(newTitleValue, newTextContentValue, newTagValue, newBannerValue);

      try {
        await authWithToken(method, postsUrl, json);
        const cardContainer = document.querySelector('.card-container');
        cardContainer.innerHTML = '';

        getPosts();

        newTitle.value = '';
        newTextContent.value = '';
        newTag.value = '';
        newBanner.value = '';

      } catch (error) {

        throw error;
      }
    });

    newPostForm.dataset.listenerAdded = "true";
  }
}