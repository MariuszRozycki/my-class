import { authWithToken } from "../authentication/authWithToken.mjs";
import { postData } from "./postData.mjs";
import { baseApi } from "../utils/api.mjs";

const UPDATE_POST_FORM_SELECTOR = '#update-post-form';
const UPDATE_POST_BANNER_SELECTOR = '#update-post-banner';
const UPDATE_POST_TITLE_SELECTOR = '#update-post-title';
const UPDATE_POST_CONTENT_SELECTOR = '#update-post-content';
const UPDATE_POST_TAG_SELECTOR = '#update-post-tag';

/**
 * Main function to update a post based on the post ID extracted from the URL.
 * This function fetches the current post data, populates the update form with this data,
 * and attaches a submit event listener to the form.
 * @async
 */
export async function updatePost() {
  const id = getPostIdFromUrl();
  const currentPostData = await fetchCurrentPostData(id);

  populateFormWithCurrentData(currentPostData);

  attachFormSubmitListener(id, currentPostData);
}

/**
 * Extracts the post ID from the current URL.
 * @returns {string} The extracted post ID.
 */
function getPostIdFromUrl() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  return params.get("id");
}

/**
 * Fetches the current data of a post by its ID.
 * @param {string} id - The ID of the post.
 * @returns {Promise<Object>} The current data of the post.
 * @async
 */
async function fetchCurrentPostData(id) {
  const postByIdUrl = `${baseApi}/posts/${id}?_author=true&_reactions=true&_comments=true`;
  const method = 'GET';
  const data = await authWithToken(method, postByIdUrl);
  return data.json;
}

/**
 * Populates the update form with the current data of the post.
 * @param {Object} currentPostData - The current data of the post.
 * @example
 * // Assuming the current post data is:
 * // { media: 'image.jpg', title: 'Sample Title', body: 'Sample Body', tags: ['#tag1', '#tag2'] }
 * populateFormWithCurrentData(currentPostData);
 * // This will populate the form fields with the respective values.
 */
function populateFormWithCurrentData(currentPostData) {
  document.querySelector(UPDATE_POST_BANNER_SELECTOR).value = currentPostData.media || '';
  document.querySelector(UPDATE_POST_TITLE_SELECTOR).value = currentPostData.title || '';
  document.querySelector(UPDATE_POST_CONTENT_SELECTOR).value = currentPostData.body || '';
  document.querySelector(UPDATE_POST_TAG_SELECTOR).value = currentPostData.tags
    ? currentPostData.tags.map(tag => tag.replace(/^#/, '')).join(', ') : '';
}

/**
 * Attaches a submit event listener to the update form.
 * When the form is submitted, the post will be updated with the new data.
 * @param {string} id - The ID of the post.
 * @param {Object} currentPostData - The current data of the post.
 */
function attachFormSubmitListener(id, currentPostData) {
  const updatePostForm = document.querySelector(UPDATE_POST_FORM_SELECTOR);

  if (!updatePostForm.dataset.listenerAdded) {
    updatePostForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleFormSubmit(id, currentPostData);
    });

    updatePostForm.dataset.listenerAdded = "true";
  }
}

/**
 * Handles the form submission, updating the post with the new data.
 * If a form field is empty, the current post data will be used.
 * @param {string} id - The ID of the post.
 * @param {Object} currentPostData - The current data of the post.
 * @async
 * @example
 * // Assuming the form fields are filled with:
 * // Title: 'New Title', Content: '', Tag: 'newTag', Banner: 'newImage.jpg'
 * // and the current post data is:
 * // { title: 'Old Title', body: 'Old Body', tags: ['#oldTag'], media: 'oldImage.jpg' }
 * handleFormSubmit('123', currentPostData);
 * // The post will be updated with:
 * // { title: 'New Title', body: 'Old Body', tags: ['#newtag'], media: 'newimage.jpg' }
 */
async function handleFormSubmit(id, currentPostData) {
  const updateUrl = `${baseApi}/posts/${id}?_author=true&_reactions=true&_comments=true`;

  const updateTitle = document.querySelector(UPDATE_POST_TITLE_SELECTOR).value || currentPostData.title;
  const updateTextContent = document.querySelector(UPDATE_POST_CONTENT_SELECTOR).value || currentPostData.body;
  const updateTagInput = document.querySelector(UPDATE_POST_TAG_SELECTOR);
  const updateTag = updateTagInput.value.trim() !== "" ? updateTagInput.value : (currentPostData.tagsArray ? currentPostData.tagsArray.join(', ') : '');
  const updateBanner = document.querySelector(UPDATE_POST_BANNER_SELECTOR).value || currentPostData.media;

  const json = postData(updateTitle, updateTextContent, updateTag, updateBanner);
  console.log(json);

  try {
    const method = 'PUT';
    await authWithToken(method, updateUrl, json);
  } catch (error) {
    throw error;
  }
}


