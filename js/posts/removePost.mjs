import { authWithToken } from "../authentication/authWithToken.mjs";
import { baseApi, postsUrl } from "../utils/api.mjs";
import { renderPost } from "./renderPost.mjs";

let isDeletingInProgress = false;

export function removePost() {
  const removePostButtons = document.querySelectorAll('.remove-post-button');

  removePostButtons.forEach(button => {
    button.addEventListener('click', async () => {

      if (isDeletingInProgress) return;

      isDeletingInProgress = true;

      await deletePost(button.getAttribute('data-id'));
      const posts = await fetchPosts();
      renderPost(posts);

      isDeletingInProgress = false;
    });
  });
}

async function deletePost(id) {
  const method = 'DELETE';
  const deleteUrl = `${baseApi}/posts/${id}`;
  await authWithToken(method, deleteUrl);
}

async function fetchPosts() {
  const method = 'GET';
  const data = await authWithToken(method, postsUrl);

  return data.json;
}