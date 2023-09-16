import { authWithToken } from "../authentication/authWithToken.mjs";
import { renderPost } from "./renderPost.mjs";
import { displayError } from "../utils/displayError.mjs";


/**
 * Filters and renders blog posts based on the selected filter option and filter input value.
 * @async
 * @param {string} url - The API endpoint URL to fetch the blog posts.
 * @throws Will throw an error if any step in the function fails.
 */

export async function filterPosts(url) {
  try {
    const allPostsHeader = document.getElementById('all-posts-header');
    const filterOption = document.getElementById('filterOption');
    const filterInput = document.getElementById('filter-input');
    const cardContainer = document.querySelector('.card-container');
    let json;

    const method = 'GET';
    const data = await authWithToken(method, url);
    json = data.json;

    filterInput.removeEventListener('input', handleInput);
    filterInput.addEventListener('input', handleInput);
    filterOption.addEventListener('change', handleFilterOptionChange);
    filterOption.addEventListener('click', handleFilterOptionChange);


    /**
     * Handles input events on the filter input field.
     * Filters the posts by author or tag based on the input and renders them.
     */
    async function handleInput() {
      const inputValue = this.value.toLowerCase();
      let filteredPosts;

      if (filterOption.value === '3') {
        filteredPosts = json.filter(post => {
          const { author: { name } } = post;
          return name.toLowerCase().includes(inputValue);
        });
        allPostsHeader.innerText = 'Filtered by author:';
        cardContainer.innerHTML = '';
        renderPost(filteredPosts);
      }
      else if (filterOption.value === '4') {
        filteredPosts = json.filter(post => {
          const { tags } = post;
          const postTags = tags ? tags.some(tag => tag.toLowerCase().includes(inputValue)) : false;
          return postTags;
        });
        allPostsHeader.innerText = 'Filtered by tag:';
        cardContainer.innerHTML = '';
        renderPost(filteredPosts);
      }

      if (this.value === '') {
        allPostsHeader.innerText = 'All posts:';
        renderPost(json);
      }
    }


    /**
     * Handles change and click events on the filter option dropdown.
     * Updates the UI based on the selected filter option.
     */
    function handleFilterOptionChange() {
      if (filterOption.value === '3' || filterOption.value === '4') {
        filterInput.classList.remove('d-none');
      } else {
        filterInput.classList.add('d-none');
      }

      if (filterOption.value === '3') {
        filterInput.placeholder = 'Enter author name';
      } else if (filterOption.value === '4') {
        filterInput.placeholder = 'Enter tag';
      }

      if (filterOption.value === '2') {
        const reversedPosts = [...json].reverse();
        cardContainer.innerHTML = '';
        renderPost(reversedPosts);
      } else if (filterOption.value === '1') {
        cardContainer.innerHTML = '';
        renderPost(json);
      }
    }

    document.addEventListener('click', function (e) {
      if (e.target !== filterInput && e.target !== filterOption) {
        filterInput.value = '';
      }
    });
  } catch (error) {
    displayError(error);
    throw error;
  }
}