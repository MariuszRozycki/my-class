import { authWithToken } from "../authentication/authWithToken.mjs";
import { renderPost } from "../posts/renderPost.mjs";


/**
 * Searches for posts matching a given input value and updates the UI.
 * The function filters posts based on their author, title, body, and tags.
 *
 * @function search
 * @async
 * @param {string} method - The HTTP method to use (e.g., "GET").
 * @param {string} postsUrl - The URL to fetch posts from.
 * @param {string} inputValue - The search query input by the user.
 * @param {HTMLElement} cardContainer - The HTML container element for displaying posts.
 * @param {HTMLElement} allPostsHeader - The HTML element displaying the header for all posts.
 * @param {HTMLElement} filterOption - The HTML element for filter options.
 * @returns {Promise<void>} - Resolves when the posts have been filtered and rendered.
 * @example
 * // Example usage within an async function
 * const method = "GET";
 * const postsUrl = "https://api.example.com/posts";
 * const inputValue = "search term";
 * const cardContainer = document.querySelector('.card-container');
 * const allPostsHeader = document.getElementById('all-posts-header');
 * const filterOption = document.querySelector('#filterOption');
 * await search(method, postsUrl, inputValue, cardContainer, allPostsHeader, filterOption);
 */
export async function search(method, postsUrl, inputValue, cardContainer, allPostsHeader, filterOption) {
  const data = await authWithToken(method, postsUrl);
  const json = data.json;

  const searchedContent = json.filter(post => {
    const { author, author: { name }, title, body, tags } = post;

    const authorName = author && name ? name.toLowerCase().includes(inputValue) : false;
    const postTitle = title ? title.toLowerCase().includes(inputValue) : false;
    const postBody = body ? body.toLowerCase().includes(inputValue) : false;
    const postTags = tags ? tags.some(tag => tag.toLowerCase().includes(inputValue)) : false;

    return authorName || postTitle || postBody || postTags;
  });

  cardContainer.innerHTML = '';
  allPostsHeader.innerText = 'Searched content:';
  filterOption.style = 'display: none';

  if (inputValue === '') {
    allPostsHeader.innerText = 'All posts:';
    filterOption.style = 'display: block';
  }

  renderPost(searchedContent);
}