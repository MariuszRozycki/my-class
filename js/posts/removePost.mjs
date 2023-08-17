import { authWithToken } from "../authentication/authWithToken.mjs";
import { baseApi, postsUrl } from "../utils/api.mjs";
import { renderPost } from "./renderPost.mjs";

export function removePost(cardContainer) {
  const removePostButtons = document.querySelectorAll('.remove-post-button');

  removePostButtons.forEach(button => {
    button.addEventListener('click', async () => {
      await deletePost(button.getAttribute('data-id'));
      const posts = await fetchPosts();
      cardContainer.innerHTML = '';
      renderPost(posts);
    });
  });
}

async function deletePost(id) {
  const method = 'DELETE';
  const deleteUrl = `${baseApi}/posts/${id}`;
  await authWithToken(method, deleteUrl);
}

async function fetchPosts() {
  const data = await authWithToken('GET', postsUrl);
  return data.json;
}
