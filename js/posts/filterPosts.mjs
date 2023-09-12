import { authWithToken } from "../authentication/authWithToken.mjs";
import { renderPost } from "./renderPost.mjs";
import { displayError } from "../utils/displayError.mjs";


/**
 * Filters posts based on user input and dropdown selection.
 * Fetches all posts and allows the user to filter them by author or sort them.
 * 
 * @async
 * @function filterPosts
 * @param {string} url - The URL for the posts API endpoint.
 * @throws Will throw an error if the fetch operation or any other operation fails.
 * 
 * @example  
 * const url = 'https://api.example.com/posts';
 * await filterPosts(url);  
 * Fetches and displays posts, allows for filtering.
 */
export async function filterPosts(url) {
  try {
    const allPostsHeader = document.getElementById('all-posts-header');
    const filterOption = document.getElementById('filterOption');
    const authorInput = document.getElementById('authorInput');
    const cardContainer = document.querySelector('.card-container');

    filterOption.addEventListener('change', function () {
      handleFilterOptionChange();
    });

    filterOption.addEventListener('click', function () {
      handleFilterOptionChange();
    });

    function handleFilterOptionChange() {
      if (filterOption.value === '3') {
        console.log(authorInput);
        authorInput.classList.remove("hidden");
      }
      else {
        console.log("Setting authorInput to invisible");
        authorInput.classList.add('hidden');
      }
      if (filterOption.value === '2') {
        const reversedPosts = [...json].reverse();

        cardContainer.innerHTML = '';
        renderPost(reversedPosts);
      }
      else if (filterOption.value === '1') {

        cardContainer.innerHTML = '';
        renderPost(json);
      }
    }

    const method = 'GET';
    const data = await authWithToken(method, url);
    const json = data.json;

    authorInput.addEventListener('input', function () {
      const inputValue = this.value.toLowerCase();

      const filteredPosts = json.filter(post => {
        const { author: { name } } = post;

        return name.toLowerCase().includes(inputValue);
      });

      allPostsHeader.innerText = 'Filtered by author:'
      cardContainer.innerHTML = '';

      if (this.value === '') {
        allPostsHeader.innerText = 'All posts:';
      }

      renderPost(filteredPosts);
    });

    document.addEventListener('click', function (e) {
      if (e.target !== authorInput && e.target !== filterOption) {
        authorInput.value = '';
      }
    });
  } catch (error) {
    displayError(error);
    throw error;
  }
}
