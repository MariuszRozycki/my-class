import { createElement } from "./createElement.mjs";

/**
 * Function createPostBody creates the body section of a post card.
 * It takes the title, body content, tags, and creation date as parameters,
 * and returns an object containing the post body and comments wrapper elements.
 * 
 * @function createPostBody
 * @param {string} titleCapAbb - The abbreviated and capitalized title of the post.
 * @param {string} bodyToUse - The body content of the post.
 * @param {string} tagsList - The list of tags associated with the post.
 * @param {string} dateInNorway - The creation date of the post in Norway time.
 * @returns {object} - An object containing the post body and comments wrapper HTML elements.
 * 
 * @example
 * const { postBody, commentsWrapper } = createPostBody('My Title', 'My Content', 'tag1, tag2', '2023-09-11');
 * cardContainer.appendChild(postBody);
 */

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