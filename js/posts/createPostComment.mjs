/**
 * Function to create a new comment on a specific post.
 * It fetches the post ID from the URL and listens for a form submission event.
 * Once the form is submitted, it sends a POST request to create a new comment.
 * After successfully adding the comment, it rerenders the post details.
 *
 * @param {HTMLElement} cardContainer - The container where the card details are rendered.
 *
 * @async
 * @throws {Error} Throws an error if the API call is unsuccessful.
 *
 * @example
 * const cardContainer = document.querySelector('.card-container');
 * createPostComment(cardContainer);
 */

import { baseApi } from "../utils/api.mjs";
import { authWithToken } from "../authentication/authWithToken.mjs";
import { renderPostDetails } from "../posts/renderPostDetails.mjs";

export function createPostComment(cardContainer) {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  const commentForm = document.querySelector('.post-comment-form');
  commentForm.addEventListener('submit', async e => {
    e.preventDefault();
    const textAreaFormContent = document.querySelector('textarea[name="comment"]');
    const commentContent = textAreaFormContent.value;
    const bodyData = {
      "body": commentContent,
    }

    try {
      const postCommentUrl = `${baseApi}/posts/${id}/comment?_author=true`;
      const method = 'POST';
      const json = await authWithToken(method, postCommentUrl, bodyData);
      console.log('json in createPostComment()', json);
      const data = json.json;
      cardContainer.innerHTML = '';
      renderPostDetails(data);
    }
    catch (error) {
      throw error;
    }
  });
}