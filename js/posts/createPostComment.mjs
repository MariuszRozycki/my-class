import { baseApi } from "../utils/api.mjs";
import { authWithToken } from "../authentication/authWithToken.mjs";
import { renderPostDetails } from "../posts/renderPostDetails.mjs";

export function createPostComment() {
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
      renderPostDetails();
    }
    catch (error) {
      throw error;
    }

  });
}