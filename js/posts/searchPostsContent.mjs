import { search } from "../utils/search.mjs";

/**
 * Initializes the search functionality for posts by setting up event listeners.
 * It uses an asynchronous search handler to query and update the UI accordingly.
 *
 * @function searchPostContent
 * @param {string} postsUrl - The URL to fetch posts from.
 * @example
 * const postsUrl = "https://api.example.com/posts";
 * searchPostsContent(postsUrl);
 */
export function searchPostsContent(postsUrl) {
  const searchForm = document.querySelector('#search-form');
  const searchInput = document.querySelector('input[type="search"]');
  const filterOption = document.querySelector('#filterOption');
  const allPostsHeader = document.getElementById('all-posts-header');
  const cardContainer = document.querySelector('.card-container');

  const method = "GET";

  const searchHandler = async function (e) {
    e.preventDefault();
    const inputValue = searchInput.value.toLowerCase();
    await search(method, postsUrl, inputValue, cardContainer, allPostsHeader, filterOption);
  };

  searchInput.addEventListener('input', searchHandler);
  searchForm.addEventListener('submit', searchHandler);
}