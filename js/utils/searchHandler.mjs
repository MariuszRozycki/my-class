import { authWithToken } from "../authentication/authWithToken.mjs";
import { renderPost } from "../posts/renderPost.mjs";
import { baseApi } from "./api.mjs";
import { postsUrl } from "./api.mjs";

export function searchHandler(url = postsUrl) {
  const searchForm = document.querySelector('#search-form');
  const searchInput = document.querySelector('input[type="search"]');

  searchInput.addEventListener('input', async function (e, inputValue = this.value.toLowerCase()) {
    search(e, inputValue, url);
  });

  searchForm.addEventListener('submit', async function (e, inputValue = searchInput.value.toLowerCase()) {
    e.preventDefault();
    search(e, inputValue, url);
  });
}

async function search(e, inputValue, url, postsUrl) {
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
      console.log(postsUrl);
      renderPost(jsonAll);

      allPostsHeader.innerText = 'All posts:';
      filterOption.style = 'display: block';
    }

  } catch (error) {
    throw error;
  }
}