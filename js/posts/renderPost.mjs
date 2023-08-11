import { abbreviateAndCapitalize } from "../utils/abbreviateAndCapitalize.mjs";
import { renderDateAndTime } from "../utils/renderDateAndTime.mjs";

export function renderPost(data) {
  console.log(data);
  for (let post of data) {
    const { media, body, created, title, tags, author: { name, avatar } } = post;
    const tagsList = tags.join(', ');

    const notExists = `Not exists`;
    const imgNotExists = '../../images/not-img.png';
    const avatarNotExists = '../../images/profile-default.png'

    const nameValue = name || notExists;
    const avatarValue = avatar || avatarNotExists;
    const mediaValue = media || imgNotExists;
    const titleValue = title || notExists;
    const bodyValue = body || notExists;
    const createdValue = created || notExists;

    const titleCapAbb = abbreviateAndCapitalize(titleValue);
    const bodyCapAbb = abbreviateAndCapitalize(bodyValue) + '...';
    const nameCapAbb = abbreviateAndCapitalize(nameValue);

    const dateInNorway = renderDateAndTime(createdValue);

    const cardContainer = document.querySelector('.card-container');

    const postWrapper = document.createElement('div');
    postWrapper.className = 'p-3 col-12 col-sm-6 col-md-4 mx-auto card rounded-0 text-light';

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'img-wrapper';

    const img = document.createElement('img');
    img.className = 'card-img-top rounded-2';
    img.src = mediaValue;
    img.alt = `Here should be img of: ${titleCapAbb}`;

    const userIdentification = document.createElement('div');
    userIdentification.className = 'user-identification d-flex justify-content-start align-items-center';
    userIdentification.innerHTML = `
    <div class="avatar-img-wrapper">
      <img class="rounded-circle border border-3 border-warning" src="${avatarValue}">
    </div>
    <p class="card-text p-2 text-wrap text-break text-start"><small>${nameCapAbb}</small></p>
    `;

    const postBody = document.createElement('div');
    postBody.className = 'card-body p-1 d-flex flex-column justify-content-between';
    postBody.innerHTML = `
    <h5 class="card-title">${titleCapAbb}</h5>
    <p class="card-text">${bodyCapAbb}</p>
    <p class="card-text">Tags: ${tagsList}</p>
    <p class="card-text p-2 mt-3 text-end"><small>Created: ${dateInNorway}</small></p>
    `;

    cardContainer.appendChild(postWrapper);
    postWrapper.appendChild(userIdentification);
    postWrapper.appendChild(imgWrapper);
    postWrapper.appendChild(postBody);
    imgWrapper.appendChild(img);
  }
}