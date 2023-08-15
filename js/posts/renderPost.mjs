import { abbreviateAndCapitalize } from "../utils/abbreviateAndCapitalize.mjs";
import { renderDateAndTime } from "../utils/renderDateAndTime.mjs";

export function renderPost(data) {
  if (!Array.isArray(data)) data = [data];

  console.log('data in renderPost:', data);
  const path = location.pathname;

  if (path === `/pages/create-post/`) {
    data.sort((a, b) => new Date(b.created) - new Date(a.created));
    data = data.slice(0, 1);
  }

  for (let post of data) {
    const { id, media, body, created, title, tags, author: { name, avatar } } = post;
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

    // const cardGroup = document.querySelector('.card-group');
    const cardContainer = document.querySelector('.card-container');
    const singlePost = document.createElement('div');
    singlePost.className = 'card text-light';
    // singlePost.className = 'p-3 col-12 col-sm-6 col-md-4 mx-auto card rounded-0 text-light'; // In case trouble use again

    singlePost.setAttribute('onclick', `window.location.href='../../pages/post-details/?id=${id}'`);


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

    // const searchedPostsHeader = document.createElement('h3');
    // searchedPostsHeader.innerText = 'Searched posts';

    if (path === `/pages/post-details/` || path === `/pages/create-post/`) {
      // cardElement.prepend(searchedPostsHeader);
      cardContainer.style = 'grid-template-columns: minmax(auto, 500px);';
      singlePost.removeAttribute('onclick', `window.location.href='../../pages/post-details/?id=${id}'`);
      singlePost.className = 'p-3 col-12 col-sm-8 mx-auto card rounded-0 text-light';
      singlePost.style = "max-width: 100%";
      imgWrapper.style = "height: 275px";
      postBody.innerHTML = `
    <h5 class="card-title">${title.charAt(0).toUpperCase() + title.slice(1)}</h5>
    <p class="card-text">${body.charAt(0).toUpperCase() + body.slice(1)}</p>
    <p class="card-text">Tags: ${tagsList}</p>
    <p class="card-text p-2 mt-3 text-end"><small>Created: ${dateInNorway}</small></p>
    `;
    }

    cardContainer.appendChild(singlePost);
    singlePost.appendChild(userIdentification);
    singlePost.appendChild(imgWrapper);
    singlePost.appendChild(postBody);
    imgWrapper.appendChild(img);
  }
}