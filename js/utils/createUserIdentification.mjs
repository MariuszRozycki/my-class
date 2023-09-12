import { createElement } from "./createElement.mjs";


/**
 * Function createUserIdentification creates a user identification section.
 * It takes the user's name and avatar URL as parameters and returns an HTML element
 * that contains the user's avatar and name.
 * 
 * @function createUserIdentification
 * @param {string} nameCapAbb - The abbreviated and capitalized name of the user.
 * @param {string} avatarValue - The URL of the user's avatar image.
 * @returns {HTMLElement} - An HTML element containing the user's avatar and name.
 * 
 * @example
 * const userIdentification = createUserIdentification('Pawel Stefanowski', 'https://example.com/avatar.jpg');
 * containerForUserId.appendChild(userIdentification);
 */

export function createUserIdentification(nameCapAbb, avatarValue) {
  const userIdentification = createElement('div', 'user-identification d-flex justify-content-start align-items-center');
  userIdentification.innerHTML = `
      <div class="avatar-img-wrapper">
          <img class="rounded-circle border border-3 border-warning" src="${avatarValue}">
      </div>
      <p class="card-text p-2 text-wrap text-break text-start"><small>@${nameCapAbb}</small></p>
  `;
  return userIdentification;
}