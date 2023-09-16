/**
 * Removes a post when the associated "remove post" button is clicked.
 * This function is specifically designed for a DOM element container where each post is rendered with a "remove post" button.
 * It uses asynchronous operations to delete the post and then re-fetch the remaining posts.
 *
 * @param {string} path - The current URL path. Used to conditionally change the behavior of the removal action.
 * @param {HTMLElement} cardContainer - The DOM element that serves as the container for all posts.
 *
 * @example
 * const path = window.location.pathname;
 * const cardContainer = document.querySelector('.card-container');
 * removePost(path, cardContainer);
 */

import { authWithToken } from "../authentication/authWithToken.mjs";
import { baseApi, postsUrl } from "../utils/api.mjs";
import { renderPost } from "./renderPost.mjs";
import { displayUserPosts } from "../profile/getUserProfile.mjs";
import { displayError } from "../utils/displayError.mjs";
import { createElement } from "../utils/createElement.mjs";
import { createButton } from "../utils/createButton.mjs";

let isDeletingInProgress = false;

export function removePost(path, cardContainer, url, loggedUserName, method, imgNotExists, nameValue, avatarValue) {
  let profileCardContainer;

  const removePostButtons = document.querySelectorAll('.remove-post-button');
  const secondNavContainer = document.querySelector('.container-second-nav');
  const secondNavItems = document.querySelectorAll('.second-nav-item');
  const addNevPost = document.querySelector('#add-new-post');

  removePostButtons.forEach(button => {
    button.addEventListener('click', async () => {

      if (isDeletingInProgress) return;
      isDeletingInProgress = true;

      try {
        await deletePost(button.getAttribute('data-id'));
        button.closest('.post-card');
        const posts = await fetchPosts();

        if (path === `/pages/post-details/` || path === `/pages/create-post/`) {
          secondNavItems.forEach(item => {
            item.classList.add('d-none');
          });
          cardContainer.innerHTML = `<p class="remove-message">Post with postId=${button.getAttribute('data-id')} has been removed forever.</p>`;
          const buttonWrap = createElement('li', 'go-to-feed-li');
          const goToFeedBtn = createButton('go-to-feed-btn btn btn-my', '', 'Go to feed');
          secondNavContainer.append(buttonWrap);
          buttonWrap.append(goToFeedBtn);
          goToFeedBtn.onclick = () => { window.location.href = '../../pages/feed/'; };

          if (path === `/pages/create-post/`) {
            addNevPost.addEventListener('click', () => {
              secondNavItems.forEach(item => {
                item.classList.remove('d-none');
                buttonWrap.remove();
              });
            })
          }

        } else if (path === `/pages/profile/` || path === `/pages/profile-by-name/`) {
          profileCardContainer = cardContainer;
          profileCardContainer.innerHTML = '';
          await displayUserPosts(url, loggedUserName, method, imgNotExists, nameValue, avatarValue, '', path);
        } else {
          cardContainer.innerHTML = '';
          await renderPost(posts);
        }
      } catch (error) {
        displayError(error);
        throw error;
      } finally {
        isDeletingInProgress = false;
      }
    });
  });
}


async function deletePost(id) {
  try {
    const method = 'DELETE';
    const deleteUrl = `${baseApi}/posts/${id}`;
    await authWithToken(method, deleteUrl);
  } catch (error) {
    displayError(error);
    throw error;
  }
}

async function fetchPosts() {
  try {
    const method = 'GET';
    const data = await authWithToken(method, postsUrl);
    return data.json;
  } catch (error) {
    displayError(error)
    throw error;
  }
}