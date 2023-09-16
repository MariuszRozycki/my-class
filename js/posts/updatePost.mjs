/**
 * Fetches the details of a post with the given ID and updates it when the form is submitted.
 * The form for updating is populated with the current details of the post. The form listens to the 
 * submit event only once to prevent multiple event bindings.
 *
 * @async
 * @function updatePost
 * @throws {Error} Throws an error if the update operation or any other operation fails.
 * @example
 * This function will populate the update form and handle the update operation when the form is submitted.
 * await updatePost();
 */


/* import functions */
import { authWithToken } from "../authentication/authWithToken.mjs";
import { postData } from "./postData.mjs";
import { createElement } from "../utils/createElement.mjs";
import { displayError } from "../utils/displayError.mjs";

/* import Url */
import { baseApi } from "../utils/api.mjs";

export async function updatePost() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  const updatePostForm = document.querySelector('#update-post-form');
  const postUpdateContainerMessage = document.querySelector('#update-post-message-container');
  const backToPostBtn = document.querySelector('.to-post-btn');

  const postByIdUrl = `${baseApi}/posts/${id}?_author=true&_reactions=true&_comments=true`;

  const method = 'GET'
  const data = await authWithToken(method, postByIdUrl);

  const currentPostData = data.json;

  document.querySelector('#update-post-banner').value = currentPostData.media || '';
  document.querySelector('#update-post-title').value = currentPostData.title || '';
  document.querySelector('#update-post-content').value = currentPostData.body || '';
  document.querySelector('#update-post-tag').value = currentPostData.tags
    ? currentPostData.tags.map(tag => tag.replace(/^#/, '').toLowerCase()).join(', ') : '';

  if (!updatePostForm.dataset.listenerAdded) {
    updatePostForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const updateUrl = `${baseApi}/posts/${id}?_author=true&_reactions=true&_comments=true`;

      const updateTitle = document.querySelector('#update-post-title').value || currentPostData.title;
      const updateTextContent = document.querySelector('#update-post-content').value || currentPostData.body;
      const updateTagInput = document.querySelector('#update-post-tag');
      const updateTag = updateTagInput.value.trim() !== "" ? updateTagInput.value : (currentPostData.tagsArray ? currentPostData.tagsArray.join(', ') : '');
      const updateBanner = document.querySelector('#update-post-banner').value || currentPostData.media;

      const json = postData(updateTitle, updateTextContent, updateTag, updateBanner);

      try {
        const method = 'PUT';
        const data = await authWithToken(method, updateUrl, json);
        const jsonBadRequest = data.json.status
        console.log(jsonBadRequest);
        if (jsonBadRequest) {
          const jsonErrors = data.json.errors;

          for (let error of jsonErrors) {
            let errorMessage = error.message;

            const errorParagraph = createElement('p', 'error', `${errorMessage}`);
            postUpdateContainerMessage.innerHTML = '';
            postUpdateContainerMessage.prepend(errorParagraph);
          }
        } else {
          const messageParagraph = createElement('p', 'nothing-to-display', 'Your post has been updated');
          postUpdateContainerMessage.innerHTML = '';
          postUpdateContainerMessage.prepend(messageParagraph);
          backToPostBtn.classList.remove('hidden');
          backToPostBtn.addEventListener('click', () => { window.location.href = `../../pages/post-details/?id=${id}` });
        }
      } catch (error) {
        displayError(error);
        throw error;
      }
    });

    updatePostForm.dataset.listenerAdded = "true";
  }
}