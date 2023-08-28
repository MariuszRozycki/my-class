import { createElement } from "./createElement.mjs";

export function createPostBody(titleCapAbb, bodyCapAbb, tagsList, dateInNorway) {

  const postBody = createElement('div', 'card-body');
  postBody.innerHTML = `
      <h5 class="card-title">${titleCapAbb}</h5>
      <p class="card-text">${bodyCapAbb}</p>
      <p class="card-text">Tags: ${tagsList}</p>
      <p class="card-text p-2 mt-3 text-end"><small>Created: ${dateInNorway}</small></p>
  `;
  const commentsWrapper = createElement('ul', 'cart-text comments-wrapper');
  const commentsHeader = createElement('li', 'cart-text');
  commentsHeader.textContent = 'Comments:';
  postBody.appendChild(commentsWrapper);
  commentsWrapper.prepend(commentsHeader)

  return { postBody, commentsWrapper };
}