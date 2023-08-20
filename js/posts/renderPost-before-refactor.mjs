import { abbreviateAndCapitalize } from "../utils/abbreviateAndCapitalize.mjs";
import { renderDateAndTime } from "../utils/renderDateAndTime.mjs";
import { getLoggedUserName } from "./getLoggedUserName.mjs";
import { removePost } from "./removePost.mjs";

export async function renderPost(data) {
  if (!Array.isArray(data)) data = [data];

  const loggedUser = getLoggedUserName();

  const cardContainer = document.querySelector('.card-container');
  cardContainer.innerHTML = '';

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

    const singlePost = document.createElement('div');
    singlePost.className = 'card text-light';

    const postContentWrapper = document.createElement('div');
    postContentWrapper.className = 'post-content-wrapper';

    /* remove button */
    const functionalButtonsWrapper = document.createElement('div');
    functionalButtonsWrapper.className = 'functional-post-buttons-wrapper';
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-post-button';
    removeButton.setAttribute('data-id', id);
    removeButton.innerHTML = 'X';

    singlePost.prepend(functionalButtonsWrapper);
    functionalButtonsWrapper.append(removeButton);

    /* update button */
    const updateButton = document.createElement('button');
    updateButton.className = 'update-post-button';
    updateButton.setAttribute('data-id', id);
    updateButton.innerHTML = 'Update post';
    functionalButtonsWrapper.prepend(updateButton);


    postContentWrapper.addEventListener('click', () => {
      window.location.href = `../../pages/post-details/?id=${id}`;
    });


    updateButton.addEventListener('click', e => {
      if (e.target.closest('.update-post-button')) {
        window.location.href = `../../pages/update/?id=${id}`;
      }
    })

    if (loggedUser !== name) {
      removeButton.style = 'display: none';
      updateButton.style = 'display: none';
    }

    if (path !== `/pages/feed/` && loggedUser !== name) {
      functionalButtonsWrapper.style = 'display: none';
    }

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
    postBody.className = 'card-body';
    postBody.innerHTML = `
    <h5 class="card-title">${titleCapAbb}</h5>
    <p class="card-text">${bodyCapAbb}</p>
    <p class="card-text">Tags: ${tagsList}</p>
    <p class="card-text p-2 mt-3 text-end"><small>Created: ${dateInNorway}</small></p>
    <p class="cart-text comment-wrapper">This is a comment</p>
    `;

    if (path === `/pages/post-details/` || path === `/pages/create-post/`) {
      cardContainer.style = 'grid-template-columns: minmax(auto, 100%);';
      singlePost.removeAttribute('onclick', `window.location.href='../../pages/post-details/?id=${id}'`);
      singlePost.className = 'p-3 col-12 col-sm-8 mx-auto card rounded-0 text-light';
      singlePost.style = "max-width: 100%";
      postBody.innerHTML = `
    <h5 class="card-title">${title.charAt(0).toUpperCase() + title.slice(1)}</h5>
    <p class="card-text">${body.charAt(0).toUpperCase() + body.slice(1)}</p>
    <p class="card-text">Tags: ${tagsList}</p>
    <p class="card-text p-2 mt-3 text-end"><small>Created: ${dateInNorway}</small></p>
    <p class="comment-wrapper>This is comment</p>
    `;
    }

    cardContainer.appendChild(singlePost);
    singlePost.appendChild(postContentWrapper);
    postContentWrapper.appendChild(userIdentification);
    postContentWrapper.appendChild(imgWrapper);
    postContentWrapper.appendChild(postBody);
    imgWrapper.appendChild(img);
  }

  removePost(cardContainer, data);

}

// // const commentForm = document.createElement('form');
// //     const commentFormInput = document.createElement('input');
// //     commentFormInput.type = 'text';
// //     commentFormInput.name = 'comment';
// //     commentFormInput.placeholder = 'Type your comment';
// //     const commentSubmitButton = document.createElement('button');
// //     commentSubmitButton.type = 'submit';
// //     commentSubmitButton.innerText = 'Add comment'

//  // singlePost.appendChild(commentForm);
//       // commentForm.appendChild(commentFormInput);
//       // commentForm.appendChild(commentSubmitButton);