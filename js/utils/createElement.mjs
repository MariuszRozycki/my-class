/**
 * Function createElement creates a new HTML element with optional class name, inner HTML, and comment owner attribute.
 * 
 * @function createElement
 * @param {string} tag - The HTML tag name for the element.
 * @param {string} [className] - Optional class name for the element.
 * @param {string} [innerHTML] - Optional inner HTML for the element.
 * @param {string} [ownerOfComment] - Optional attribute for the comment owner.
 * @returns {HTMLElement} - The created HTML element.
 * 
 * @example
 * const myDiv = createElement('div', 'my-class', 'Hello, World!', 'JohnDoe');
 * someCreatedContainer.appendChild(myDiv);
 */

export function createElement(tag, className, innerHTML, ownerOfComment) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (innerHTML) element.innerHTML = innerHTML;
  if (ownerOfComment) element.setAttribute('comment-owner', ownerOfComment);
  return element;
}