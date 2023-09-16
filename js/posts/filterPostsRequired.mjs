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
  const authorInput = document.getElementById('authorInput');
  const method = 'GET';

  try {
    postWithTags.addEventListener('click', function () {
      postWithTagsFilter(method, url, cardContainer, allPostsHeader, filterOption, authorInput);
    });
    postsWithComments.addEventListener('click', function () {
      renderPostsComments(method, url, cardContainer, allPostsHeader, filterOption, authorInput);
    });
    allPostsRatio.addEventListener('click', function () {
      renderPostsAll(method, url, cardContainer, allPostsHeader);
    });

  } catch (error) {
    throw error;
  }
}


async function postWithTagsFilter(method, url, cardContainer, allPostsHeader) {
  const data = await authWithToken(method, url);
  const json = data.json;

  allPostsHeader.innerText = 'Posts with tags:';
  filterOption.classList.add('d-none');
  authorInput.classList.add('hidden');
  cardContainer.innerHTML = '';

  const postsWithTags = json.filter(post => post.tags && post.tags.length > 0 && post.tags[0] !== '');

  for (let post of postsWithTags) {
    console.log(post);
    renderPost(post);
  }
}


async function renderPostsComments(method, url, cardContainer, allPostsHeader) {
  const data = await authWithToken(method, url);
  const json = data.json;

  allPostsHeader.innerText = 'Posts with comments:';
  filterOption.classList.add('d-none');
  authorInput.classList.add('hidden');
  cardContainer.innerHTML = '';

  const postsWithComments = json.filter(post => post.comments && post.comments.length > 0);

  for (let post of postsWithComments) {
    renderPost(post);
  }
}


async function renderPostsAll(method, url, cardContainer, allPostsHeader) {
  const data = await authWithToken(method, url);
  const json = data.json;

  allPostsHeader.innerText = 'All posts:'
  filterOption.classList.remove('d-none');
  authorInput.classList.remove('hidden');
  cardContainer.innerHTML = '';
  for (let post of json) {
    console.log(post);
    renderPost(post);
  }
}
