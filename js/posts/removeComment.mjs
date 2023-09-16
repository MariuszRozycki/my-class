// import { authWithToken } from "../authentication/authWithToken.mjs";
// import { baseApi } from "../utils/api.mjs";
import { getLoggedUserName } from "./getLoggedUserName.mjs";
import { displayError } from "../utils/displayError.mjs";

export async function removeComment() {
  const removeCommentButtons = document.querySelectorAll('.remove-comment-button');
  const comments = document.querySelectorAll('.comment-element');
  const loggedUser = getLoggedUserName();
  try {

    removeCommentButtons.forEach(button => {
      const commentOwnerAtr = button.getAttribute('comment-owner');
      if (commentOwnerAtr !== loggedUser) {
        button.classList.add('hidden');
      }

      button.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const buttonDataId = button.getAttribute('data-id');

        for (let comment of comments) {
          const commentDataId = comment.getAttribute('data-comment-id');
          if (buttonDataId === commentDataId) {
            comment.remove();
            // Here should be: await deleteComment(commentDataId); but can't find delete comment endpoint.
            break;
          }
        }
      });
    });
  } catch (error) {
    displayError(error);
    throw error;
  }
}

// async function deleteComment(id) {
// const method = 'DELETE';
// const deleteUrl = `${baseApi}/posts/${id}/comment`; Can not find delete comment endpoint.
// await authWithToken(method, deleteUrl);
// }
