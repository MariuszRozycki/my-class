import { createElement } from "./createElement.mjs";

export function createCommentForm() {
  const commentForm = createElement('form', 'post-comment-form');
  const commentFormTextArea = createElement('textarea');
  commentFormTextArea.name = 'comment';
  commentFormTextArea.placeholder = 'Type your comment';
  const commentSubmitButton = createElement('button', null, 'Add comment');
  commentSubmitButton.type = 'submit';
  commentForm.appendChild(commentFormTextArea);
  commentForm.appendChild(commentSubmitButton);

  return commentForm;
}