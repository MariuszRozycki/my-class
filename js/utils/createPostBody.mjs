import { createElement } from "./createElement.mjs";

export function createPostBody(titleCapAbb, bodyToUse, tagsList, dateInNorway) {
  let displayTags;

  if (tagsList === '') {
    displayTags = 'No tags added';
  } else {
    displayTags = tagsList.split(', ').map(tag => '#' + tag.toLowerCase()).join(', ');
  }

  const postBody = createElement('div', 'card-body');
  postBody.innerHTML = `
      <h5 class="card-title">${titleCapAbb}</h5>
      <p class="card-text">${bodyToUse}</p>
      <p class="card-text">Tags: ${displayTags}</p>
      <p class="card-text p-2 mt-3 text-end"><small>Created: ${dateInNorway}</small></p>
  `;

  const commentsWrapper = createElement('ul', 'cart-text comments-wrapper');
  const commentsHeader = createElement('li', 'cart-text');
  commentsHeader.textContent = 'Comments:';
  postBody.appendChild(commentsWrapper);
  commentsWrapper.prepend(commentsHeader);

  return { postBody, commentsWrapper };
}