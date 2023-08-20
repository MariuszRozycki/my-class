/* import functions */
import { authWithToken } from "../authentication/authWithToken.mjs";
import { postData } from "./postData.mjs";

/* import Url */
import { baseApi } from "../utils/api.mjs";

export async function updatePost() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  const updatePostForm = document.querySelector('#update-post-form');

  const postByIdUrl = `${baseApi}/posts/${id}?_author=true&_reactions=true&_comments=true`;
  console.log(postByIdUrl);

  const method = 'GET'
  const data = await authWithToken(method, postByIdUrl);
  const currentPostData = data.json;

  document.querySelector('#update-post-banner').value = currentPostData.media || '';
  document.querySelector('#update-post-title').value = currentPostData.title || '';
  document.querySelector('#update-post-content').value = currentPostData.body || '';
  document.querySelector('#update-post-tag').value = currentPostData.tags
    ? currentPostData.tags.map(tag => tag.replace(/^#/, '')).join(', ') : '';

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
      console.log(json);

      try {
        const method = 'PUT';
        await authWithToken(method, updateUrl, json);
        window.location = `../../pages/post-details/?id=${id}`;
      } catch (error) {
        throw error;
      }
    });

    updatePostForm.dataset.listenerAdded = "true";
  }
}