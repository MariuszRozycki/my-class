/**
 * Asynchronously filters and displays posts based on user interaction.
 * The function toggles between rendering posts that have comments and rendering all posts.
 *
 * @async
 * @function filterPostRequired
 * @param {string} url - The API endpoint from which to fetch the posts.
 * @throws {Error} Will propagate any errors that occur during the operation.
 *
 * @example
 * const apiUrl = "https://api.example.com/posts";
 * filterPostsRequired(apiUrl);
 */

import { authWithToken } from "../authentication/authWithToken.mjs";
import { renderPost } from "./renderPost.mjs";

export async function filterPostsRequired(url) {
  const cardContainer = document.querySelector('.card-container');
  const postWithTags = document.querySelector('#posts-with-tags');
  const postsWithComments = document.querySelector('#posts-with-comments');
  const allPostsRatio = document.querySelector('#all-posts-radio');
  const allPostsHeader = document.getElementById('all-posts-header');
  const filterOption = document.getElementById('filterOption');
  const filterInput = document.getElementById('filter-input');
  const method = 'GET';

  try {
    postWithTags.addEventListener('click', function () {
      postWithTagsFilter(method, url, cardContainer, allPostsHeader, filterOption, filterInput);
    });
    postsWithComments.addEventListener('click', function () {
      renderPostsComments(method, url, cardContainer, allPostsHeader, filterOption, filterInput);
    });
    allPostsRatio.addEventListener('click', function () {
      renderPostsAll(method, url, cardContainer, allPostsHeader, filterOption, filterInput);
    });

  } catch (error) {
    throw error;
  }
}


async function postWithTagsFilter(method, url, cardContainer, allPostsHeader, filterOption, filterInput) {
  const data = await authWithToken(method, url);
  const json = data.json;

  allPostsHeader.innerText = 'Posts with tags:';
  filterOption.classList.add('d-none');
  filterInput.classList.add('d-none');
  cardContainer.innerHTML = '';

  const postsWithTags = json.filter(post => post.tags && post.tags.length > 0 && post.tags[0] !== '');

  for (let post of postsWithTags) {
    renderPost(post);
  }
}


async function renderPostsComments(method, url, cardContainer, allPostsHeader, filterOption, filterInput) {
  const data = await authWithToken(method, url);
  const json = data.json;

  allPostsHeader.innerText = 'Posts with comments:';
  filterOption.classList.add('d-none');
  filterInput.classList.add('d-none');
  cardContainer.innerHTML = '';

  const postsWithComments = json.filter(post => post.comments && post.comments.length > 0);

  for (let post of postsWithComments) {
    renderPost(post);
  }
}


async function renderPostsAll(method, url, cardContainer, allPostsHeader, filterOption, filterInput) {
  const data = await authWithToken(method, url);
  const json = data.json;

  allPostsHeader.innerText = 'All posts:'
  filterOption.classList.remove('d-none');
  if (filterOption.value === '3' || filterOption.value === '4') {
    filterInput.classList.remove('d-none');
  } else {
    filterInput.classList.add('d-none');
  }
  cardContainer.innerHTML = '';
  for (let post of json) {
    renderPost(post);
  }
}