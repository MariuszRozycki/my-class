import { createElement } from "./createElement.mjs";

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