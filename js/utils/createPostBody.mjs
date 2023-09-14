import { createElement } from "./createElement.mjs";
import { sanitizeBeforeRender } from "./sanitizeBeforeRender.mjs";

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

  const sanitizedTitle = sanitizeBeforeRender(titleCapAbb);
  const sanitizedBody = sanitizeBeforeRender(bodyToUse);
  const sanitizedTags = sanitizeBeforeRender(displayTags);
  const sanitizedDate = sanitizeBeforeRender(dateInNorway);

  const postBody = createElement('div', 'card-body');
  const postHeader = createElement('h5', 'card-title', `${sanitizedTitle}`);
  postBody.appendChild(postHeader);
  const postContent = createElement('p', 'card-text', `${sanitizedBody}`);
  postBody.appendChild(postContent);
  const postTags = createElement('p', 'card-text', `${sanitizedTags}`);
  postBody.appendChild(postTags);
  const postDateWrapper = createElement('p', 'card-text p-2 mt-3 text-end');
  postBody.appendChild(postDateWrapper);
  const postDate = createElement('small', '', `Created: ${sanitizedDate}`);
  postBody.appendChild(postDate);


  const commentsWrapper = createElement('ul', 'cart-text comments-wrapper');
  const commentsHeader = createElement('li', 'cart-text');
  commentsHeader.textContent = 'Comments:';
  postBody.appendChild(commentsWrapper);
  commentsWrapper.prepend(commentsHeader);

  return { postBody, commentsWrapper };
}