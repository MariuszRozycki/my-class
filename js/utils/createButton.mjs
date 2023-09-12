/**
 * Function createButton creates a new button element.
 * It sets the class name, data-id, and innerHTML for the button.
 * Optionally, it can also set a 'comment-owner' attribute.
 * 
 * @function createButton
 * @param {string} className - The class name for the button.
 * @param {string} [dataId] - The data-id attribute for the button. Optional.
 * @param {string} innerHTML - The text that will be inside the button.
 * @param {string} [ownerOfComment] - The owner of the comment, if applicable. Optional.
 * @returns {HTMLElement} - The created button element.
 * 
 * @example
 * const myButton = createButton('my-class', 'data123', 'Click Me', 'JohnDoe');
 * someContainer.appendChild(myButton);
 */

import { createElement } from "./createElement.mjs";

export function createButton(className, dataId, innerHTML, ownerOfComment) {
  const button = createElement('button', className, innerHTML);
  if (dataId) button.setAttribute('data-id', dataId);
  if (ownerOfComment) button.setAttribute('comment-owner', ownerOfComment);
  return button;
}