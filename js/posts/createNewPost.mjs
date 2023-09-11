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
import { displayError } from "../utils/displayError.mjs";

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
      const cardContainer = document.querySelector('.card-container');
      const bannerError = document.querySelector('.new-post-banner-error');
      const titleError = document.querySelector('.new-post-title-error');
      const contentError = document.querySelector('.new-post-content-error');
      const tagError = document.querySelector('.new-post-tag-error');

      const newTitleValue = newTitle.value;
      const newTextContentValue = newTextContent.value;
      const newTagValue = newTag.value.toLowerCase();
      const newBannerValue = newBanner.value;

      const dataValue = postData(newTitleValue, newTextContentValue, newTagValue, newBannerValue);

      try {

        let isBannerError = false;
        let isTitleError = false;
        let isContentError = false;
        let isTagError = false;

        const json = await authWithToken(method, postsUrl, dataValue);
        const jsonBadRequest = json.json.status
        console.log(jsonBadRequest);

        if (jsonBadRequest) {
          const jsonErrors = json.json.errors;

          for (let error of jsonErrors) {
            const errorMessage = error.message;

            switch (true) {
              case errorMessage.includes('Image'):
                isBannerError = true;
                bannerError.classList.remove('hidden');
                bannerError.innerText = `${errorMessage}`;
                break;
              case errorMessage.includes('Title'):
                isTitleError = true;
                titleError.classList.remove('hidden');
                titleError.innerText = `${errorMessage}`;
                break;
              case errorMessage.includes('Body'):
                isContentError = true;
                contentError.classList.remove('hidden');
                contentError.innerText = `${errorMessage}`;
                break;
              case errorMessage.includes('Tag'):
                isTagError = true;
                tagError.classList.remove('hidden');
                tagError.innerText = `${errorMessage}`;
                break;
              default:
            }
          }
        } else {

          newTitle.value = '';
          newTextContent.value = '';
          newTag.value = '';
          newBanner.value = '';


          cardContainer.innerHTML = '';
          getPosts();
        }

        if (!isBannerError) bannerError.classList.add('hidden');
        if (!isTitleError) titleError.classList.add('hidden');
        if (!isContentError) contentError.classList.add('hidden');
        if (!isTagError) tagError.classList.add('hidden');

      } catch (error) {
        displayError(error);
        throw error;
      }
    });

    newPostForm.dataset.listenerAdded = "true";
  }
}