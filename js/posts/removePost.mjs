/**
 * Removes a post when the associated "remove post" button is clicked.
 * This function is specifically designed for a DOM element container where each post is rendered with a "remove post" button.
 * It uses asynchronous operations to delete the post and then re-fetch the remaining posts.
 *
 * @param {string} path - The current URL path. Used to conditionally change the behavior of the removal action.
 * @param {HTMLElement} cardContainer - The DOM element that serves as the container for all posts.
 *
 * @example
 * // Initialize removal functionality on a specified container
 * const path = window.location.pathname;
 * const cardContainer = document.querySelector('.card-container');
 * removePost(path, cardContainer);
 */

import { authWithToken } from "../authentication/authWithToken.mjs";
import { baseApi, postsUrl } from "../utils/api.mjs";
import { renderPost } from "./renderPost.mjs";
import { displayUserPosts } from "../profile/getUserProfile.mjs";

let isDeletingInProgress = false;

export function removePost(path, cardContainer, url, loggedUserName, method, imgNotExists, nameValue, avatarValue) {
  console.log('path:', path);
  const removePostButtons = document.querySelectorAll('.remove-post-button');

  removePostButtons.forEach(button => {
    button.addEventListener('click', async () => {

      if (isDeletingInProgress) return;

      isDeletingInProgress = true;

      await deletePost(button.getAttribute('data-id'));
      const posts = await fetchPosts();

      if (path === `/pages/post-details/` || path === `/pages/create-post/`) {
        cardContainer.innerHTML = `<p class="bg-secondary mt-3 py-2 remove-message">Post with postId=${button.getAttribute('data-id')} has been removed forever.</p>`;
      } else if (path === `/pages/profile/`) {
        cardContainer.innerHTML = '';
        await displayUserPosts(url, loggedUserName, method, imgNotExists, nameValue, avatarValue);
      } else {
        cardContainer.innerHTML = '';
        renderPost(posts);
      }

      isDeletingInProgress = false;
    });
  });
}


async function deletePost(id) {
  const method = 'DELETE';
  const deleteUrl = `${baseApi}/posts/${id}`;
  await authWithToken(method, deleteUrl);
}

async function fetchPosts() {
  const method = 'GET';
  const data = await authWithToken(method, postsUrl);

  return data.json;
}