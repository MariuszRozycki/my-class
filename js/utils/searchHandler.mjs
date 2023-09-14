import { authWithToken } from "../authentication/authWithToken.mjs";
import { renderPost } from "../posts/renderPost.mjs";

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







// export function searchHandler(postsUrl) {
//   const searchForm = document.querySelector('#search-form');
//   const searchInput = document.querySelector('input[type="search"]');
//   const filterOption = document.querySelector('#filterOption');
//   const allPostsHeader = document.getElementById('all-posts-header');
//   const cardContainer = document.querySelector('.card-container');

//   const search = async function (e) {
//     e.preventDefault();
//     const method = "GET";
//     const data = await authWithToken(method, postsUrl);
//     const json = data.json;
//     const inputValue = searchInput.value.toLowerCase();

//     const searchedContent = json.filter(post => {
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
//   };

//   searchInput.addEventListener('input', search);
//   searchForm.addEventListener('submit', search);
// }

