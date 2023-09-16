import { createElement } from "./createElement.mjs";


/**
 * Function createImgWrapper creates an image wrapper div and embeds an image element inside it.
 * 
 * @function createImgWrapper
 * @param {string} mediaValue - The source URL for the image.
 * @param {string} titleCapAbb - The abbreviated and capitalized title to be used as the image's alt text.
 * @returns {HTMLElement} - The created image wrapper div containing the image element.
 * 
 * @example
 * const myImgWrapper = createImgWrapper('https://example.com/image.jpg', 'My Title');
 * someCreatedContainer.appendChild(myImgWrapper);
 */
export function createImgWrapper(mediaValue, titleCapAbb) {
  const imgWrapper = createElement('div', 'img-wrapper rounded-2');
  const img = createElement('img', 'card-img-top rounded-2');
  img.src = mediaValue;
  img.alt = `Here should be img of: ${titleCapAbb}`;
  imgWrapper.appendChild(img);
  return imgWrapper;
}