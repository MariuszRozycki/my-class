import { authWithToken } from "../authentication/authWithToken.mjs";
import { postsUrl } from "../utils/api.mjs";
import { renderPost } from "./renderPost.mjs";

export async function filterPosts() {
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
    if (filterOption.value === "3") {
      authorInput.classList.remove("d-none");
    }
    else {
      authorInput.classList.add("d-none");
    }
    if (filterOption.value === "2") {
      const reversedPosts = [...json].reverse();

      cardContainer.innerHTML = '';
      renderPost(reversedPosts);
    }
    else if (filterOption.value === "1") {

      cardContainer.innerHTML = '';
      renderPost(json);
    }
  }


  const method = "GET";
  const json = await authWithToken(method, postsUrl);

  authorInput.addEventListener('input', function () {
    const inputValue = this.value.toLowerCase();

    const filteredPosts = json.filter(post => post.author.name.toLowerCase().includes(inputValue));

    cardContainer.innerHTML = '';
    renderPost(filteredPosts);
  });

  document.addEventListener('click', function (event) {
    if (event.target !== authorInput && event.target !== filterOption) {
      authorInput.classList.add("d-none");
    }
  });
}