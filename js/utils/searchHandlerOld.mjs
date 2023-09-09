import { authWithToken } from "../authentication/authWithToken.mjs";
import { renderPost } from "../posts/renderPost.mjs";

export function searchHandler(postsUrl) {
  const searchInput = document.querySelector('input[type="search"]');
  const filterOption = document.querySelector('#filterOption');
  const allPostsHeader = document.getElementById('all-posts-header');
  const cardContainer = document.querySelector('.card-container');

  searchInput.addEventListener('input', async function (e) {
    e.preventDefault();
    const method = "GET";
    const data = await authWithToken(method, postsUrl);
    const json = data.json;
    const inputValue = this.value.toLowerCase();

    const searchedContent = json.filter(post => {
      const authorName = post.author && post.author.name ? post.author.name.toLowerCase().includes(inputValue) : false;
      const postTitle = post.title ? post.title.toLowerCase().includes(inputValue) : false;
      const postBody = post.body ? post.body.toLowerCase().includes(inputValue) : false;
      const postTags = post.tags ? post.tags.some(tag => tag.toLowerCase().includes(inputValue)) : false;
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

    console.log(searchedContent);
  })
}