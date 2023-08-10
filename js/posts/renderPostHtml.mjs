import { abbreviateAndCapitalize } from "../utils/abbreviateAndCapitalize.mjs";
import { renderDateAndTime } from "../utils/renderDateAndTime.mjs";

export function renderPostHtml(media, avatar, title, body, created, name) {

  const notExists = `Not exists`;
  const imgNotExists = '../../images/not-img.png';
  const avatarNotExists = '../../images/profile-default.png'

  name = name || notExists;
  avatar = avatar || avatarNotExists;
  media = media || imgNotExists;
  title = title || notExists;
  body = body || notExists;
  created = created || notExists;

  const capitalizeTitleAbbrev = abbreviateAndCapitalize(title);
  const capitalizeBodyContAbbrev = abbreviateAndCapitalize(body);
  const capitalizeNameContAbbrev = abbreviateAndCapitalize(name);

  const dateInNorway = renderDateAndTime(created);

  const cardContainer = document.querySelector('.card-container');

  const postWrapper = document.createElement('div');
  postWrapper.className = 'p-3 col-12 col-sm-6 col-md-4 card rounded-0 text-light';

  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'img-wrapper';

  const img = document.createElement('img');
  img.className = 'card-img-top rounded-2 p-1';
  img.src = media;
  img.alt = title;

  const userIdentification = document.createElement('div');
  userIdentification.className = 'user-identification d-flex justify-content-start align-items-center';
  userIdentification.innerHTML = `
  <div class="avatar-img-wrapper">
    <img class="rounded-circle border border-3 border-warning" src="${avatar}">
  </div>
  <p class="card-text p-2 text-wrap text-break text-start"><small>${capitalizeNameContAbbrev}</small></p>
  `;

  const postBody = document.createElement('div');
  postBody.className = 'card-body p-1 d-flex flex-column justify-content-between';
  postBody.innerHTML = `
  <h5 class="card-title">${capitalizeTitleAbbrev}</h5>
  <p class="card-text">${capitalizeBodyContAbbrev}</p>
  <p class="card-text p-2 mt-3 text-end"><small>Created: ${dateInNorway}</small></p>
  `;

  cardContainer.appendChild(postWrapper);
  postWrapper.appendChild(userIdentification);
  postWrapper.appendChild(imgWrapper);
  postWrapper.appendChild(postBody);
  imgWrapper.appendChild(img);
}


