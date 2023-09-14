import { authWithToken } from "../authentication/authWithToken.mjs";
import { renderPost } from "../posts/renderPost.mjs";


/**
 * Searches for posts matching the user input and updates the UI accordingly.
 *
 * @function search
 * @async
 * @param {string} method - The HTTP method "GET".
 * @param {string} postsUrl - The URL to fetch posts from.
 * @param {string} inputValue - The search query input by the user.
 * @param {HTMLElement} cardContainer - The HTML container element for displaying posts.
 * @param {HTMLElement} allPostsHeader - The HTML element displaying the header for all posts.
 * @param {HTMLElement} filterOption - The HTML element for the filter options.
 * @example
 * const method = "GET";
 * const postsUrl = "https://api.example.com/posts";
 * const inputValue = "search term";
 * const cardContainer = document.querySelector('.card-container');
 * const allPostsHeader = document.getElementById('all-posts-header');
 * const filterOption = document.querySelector('#filterOption');
 * await search(method, postsUrl, inputValue, cardContainer, allPostsHeader, filterOption);
 */
async function search(method, postsUrl, inputValue, cardContainer, allPostsHeader, filterOption) {
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


/**
 * Initializes the search handler and sets up the required event listeners.
 *
 * @param {string} postsUrl - The URL to fetch posts from.
 * @example
 * const postsUrl = "https://api.example.com/posts";
 * searchHandler(postsUrl);
 */
export function searchHandler(postsUrl) {
  const searchForm = document.querySelector('#search-form');
  const searchInput = document.querySelector('input[type="search"]');
  const filterOption = document.querySelector('#filterOption');
  const allPostsHeader = document.getElementById('all-posts-header');
  const cardContainer = document.querySelector('.card-container');

  const method = "GET";

  const handleSearch = async function (e) {
    e.preventDefault();
    const inputValue = searchInput.value.toLowerCase();
    await search(method, postsUrl, inputValue, cardContainer, allPostsHeader, filterOption);
  };

  searchInput.addEventListener('input', handleSearch);
  searchForm.addEventListener('submit', handleSearch);
}