import { createElement } from "./createElement.mjs";


/**
 * Function createCommentForm creates a new comment form element.
 * The form consists of a textarea for the comment and a submit button.
 * 
 * @function createCommentForm
 * @returns {HTMLElement} - The created comment form element.
 * 
 * @example
 * const myCommentForm = createCommentForm();
 * someCreatedContainer.appendChild(myCommentForm);
 */
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