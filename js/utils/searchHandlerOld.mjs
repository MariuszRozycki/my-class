import { authWithToken } from "../authentication/authWithToken.mjs";
import { renderPost } from "../posts/renderPost.mjs";
import { baseApi } from "./api.mjs";
import { postsUrl } from "./api.mjs";

/**
 * Initializes search functionality by attaching event listeners to the search form and input elements.
 * Listens for two types of events: 'input' and 'submit'.
 *
 * @function
 * @export
 *
 * @example
 * // Example usage:
 * searchHandler();
 */
export function searchHandler() {
  const searchForm = document.querySelector('#search-form');
  const searchInput = document.querySelector('input[type="search"]');

  searchInput.addEventListener('input', async function (e, inputValue = this.value.toLowerCase()) {
    search(e, inputValue, postsUrl);
  });

  searchForm.addEventListener('submit', async function (e, inputValue = searchInput.value.toLowerCase()) {
    e.preventDefault();
    search(e, inputValue, postsUrl);
  });
}



/**
 * Performs a search operation based on the given input value.
 * Fetches posts from a specified URL and updates the UI accordingly.
 *
 * @async
 * @function
 * @param {Event} e - The event object, usually from an input or submit event.
 * @param {string} inputValue - The value entered in the search input.
 * @param {string} url - The base URL to fetch posts by tag.
 * @throws Will throw an error if the fetch operation or any other operation fails.
 *
 * @example
 * const event = new Event('input');
 * const inputValue = 'javascript';
 * url = `${baseApi}/posts?_tag=${inputValue}&_author=true&_comments=true`;
 * search(event, inputValue, url);
 */
async function search(e, inputValue, url) {
  const filterOption = document.querySelector('#filterOption');
  const allPostsHeader = document.getElementById('all-posts-header');
  const cardContainer = document.querySelector('.card-container');
  const createPost = document.querySelector('.create-post');

  try {
    e.preventDefault();
    const method = "GET";

    if (inputValue === '#') {
      return;
    }

    if (inputValue !== '') {
      createPost.classList.add('d-none');
      url = `${baseApi}/posts?_tag=${inputValue}&_author=true&_comments=true`;
    }
    const filterTagEndpoint = await authWithToken(method, url);
    const json = filterTagEndpoint.json;

    cardContainer.innerHTML = '';
    allPostsHeader.innerText = 'Searched content:';
    filterOption.style = 'display: none';

    json.map(async (data) => {
      renderPost(data);
    });

    if (inputValue === '') {
      createPost.classList.remove('d-none');
      const allPost = await authWithToken(method, url);
      const jsonAll = allPost.json;

      renderPost(jsonAll);

      allPostsHeader.innerText = 'All posts:';
      filterOption.style = 'display: block';
    }

  } catch (error) {
    throw error;
  }
}
















// another version
// export function searchHandler(postsUrl) {
//   const searchForm = document.querySelector('#search-form');
//   const searchInput = document.querySelector('input[type="search"]');
//   const filterOption = document.querySelector('#filterOption');
//   const allPostsHeader = document.getElementById('all-posts-header');
//   const cardContainer = document.querySelector('.card-container');

//   searchInput.addEventListener('input', async function (e) {
//     e.preventDefault();
//     const method = "GET";
//     const data = await authWithToken(method, postsUrl);
//     const json = data.json;
//     const inputValue = this.value.toLowerCase();

//     const searchedContent = json.filter(post => {
//       console.log(post);
//       const { author, author: { name }, title, body, tags } = post;

//       const authorName = author && name ? name.toLowerCase().includes(inputValue) : false;
//       const postTitle = title ? title.toLowerCase().includes(inputValue) : false;
//       const postBody = body ? body.toLowerCase().includes(inputValue) : false;
//       const postTags = tags ? tags.some(tag => tag.toLowerCase().includes(inputValue)) : false;
//       return authorName || postTitle || postBody || postTags;
//     });

//     cardContainer.innerHTML = '';
//     allPostsHeader.innerText = 'Searched content:';
//     filterOption.style = 'display: none';

//     if (inputValue === '') {
//       allPostsHeader.innerText = 'All posts:';
//       filterOption.style = 'display: block';
//     }

//     renderPost(searchedContent);

//     console.log(searchedContent);
//   })
// }