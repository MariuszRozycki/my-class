import { abbreviateAndCapitalize } from "../utils/abbreviateAndCapitalize.mjs";
import { renderDateAndTime } from "../utils/renderDateAndTime.mjs";
import { getLoggedUserName } from "./getLoggedUserName.mjs";
import { removePost } from "./removePost.mjs";
import { createPostComment } from "./createPostComment.mjs";

function createElement(tag, className, innerHTML) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}

function createButton(className, dataId, innerHTML) {
  const button = createElement('button', className, innerHTML);
  if (dataId) button.setAttribute('data-id', dataId);
  return button;
}

function createImgWrapper(mediaValue, titleCapAbb) {
  const imgWrapper = createElement('div', 'img-wrapper');
  const img = createElement('img', 'card-img-top rounded-2');
  img.src = mediaValue;
  img.alt = `Here should be img of: ${titleCapAbb}`;
  imgWrapper.appendChild(img);
  return imgWrapper;
}

function createUserIdentification(nameCapAbb, avatarValue) {
  const userIdentification = createElement('div', 'user-identification d-flex justify-content-start align-items-center');
  userIdentification.innerHTML = `
      <div class="avatar-img-wrapper">
          <img class="rounded-circle border border-3 border-warning" src="${avatarValue}">
      </div>
      <p class="card-text p-2 text-wrap text-break text-start"><small>${nameCapAbb}</small></p>
  `;
  return userIdentification;
}

function createPostBody(titleCapAbb, bodyCapAbb, tagsList, dateInNorway) {

  const postBody = createElement('div', 'card-body');
  postBody.innerHTML = `
      <h5 class="card-title">${titleCapAbb}</h5>
      <p class="card-text">${bodyCapAbb}</p>
      <p class="card-text">Tags: ${tagsList}</p>
      <p class="card-text p-2 mt-3 text-end"><small>Created: ${dateInNorway}</small></p>
  `;
  const commentsWrapper = createElement('ul', 'cart-text comments-wrapper');
  const commentsHeader = createElement('li', 'cart-text');
  commentsHeader.textContent = 'Comments:';
  postBody.appendChild(commentsWrapper);
  commentsWrapper.prepend(commentsHeader)

  return { postBody, commentsWrapper };
}

function createCommentForm() {
  const commentForm = createElement('form', 'post-comment-form');
  const commentFormTextArea = createElement('textarea');
  commentFormTextArea.name = 'comment';
  commentFormTextArea.placeholder = 'Type your comment';
  const commentSubmitButton = createElement('button', null, 'Add comment');
  commentSubmitButton.type = 'submit';
  commentForm.appendChild(commentFormTextArea);
  commentForm.appendChild(commentSubmitButton);
  return commentForm;
}

export async function renderPost(data) {
  if (!Array.isArray(data)) data = [data];

  const postIdFromUrl = new URLSearchParams(window.location.search).get('id');
  console.log(postIdFromUrl);

  const loggedUser = getLoggedUserName();
  const cardContainer = document.querySelector('.card-container');
  cardContainer.innerHTML = '';
  const path = location.pathname;

  if (path === `/pages/create-post/`) {
    data.sort((a, b) => new Date(b.created) - new Date(a.created));
    data = data.slice(0, 1);
  }

  for (let post of data) {
    const { id, media, body, created, title, tags, author: { name, avatar }, comments } = post;


    if (path === `/pages/post-details/` && String(id) !== postIdFromUrl) {
      continue;
    }

    const tagsList = tags.join(', ');

    const notExists = `Not exists`;
    const imgNotExists = '../../images/not-img.png';
    const avatarNotExists = '../../images/profile-default.png';
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

    const singlePost = createElement('div', 'card text-light');
    const postContentWrapper = createElement('div', 'post-content-wrapper');
    const functionalButtonsWrapper = createElement('div', 'functional-post-buttons-wrapper');
    const removeButton = createButton('remove-post-button', id, 'X');
    const updateButton = createButton('update-post-button', id, 'Update post');

    functionalButtonsWrapper.append(updateButton, removeButton);
    singlePost.prepend(functionalButtonsWrapper);

    const imgWrapper = createImgWrapper(mediaValue, titleCapAbb);
    const userIdentification = createUserIdentification(nameCapAbb, avatarValue);
    const { postBody, commentsWrapper } = createPostBody(titleCapAbb, bodyCapAbb, tagsList, dateInNorway);

    postContentWrapper.addEventListener('click', () => {
      window.location.href = `../../pages/post-details/?id=${id}`;
    });

    updateButton.addEventListener('click', e => {
      if (e.target.closest('.update-post-button')) {
        window.location.href = `../../pages/update/?id=${id}`;
      }
    });

    if (loggedUser !== name) {
      removeButton.style = 'display: none';
      updateButton.style = 'display: none';
    }

    if (path !== `/pages/feed/` && loggedUser !== name) {
      functionalButtonsWrapper.style = 'display: none';
    }

    cardContainer.appendChild(singlePost);
    singlePost.appendChild(postContentWrapper);
    postContentWrapper.append(userIdentification, imgWrapper, postBody);

    let hasComments = false;

    comments.forEach(comment => {
      console.log(comment);
      if (comment) {
        hasComments = true;

        const commentElement = createElement('li', 'card-text comment-element');
        const commentLink = createElement('a', 'comment-link');
        const commentOwner = createElement('p', 'comment-owner', `@${comment.owner}`);
        const commentContent = createElement('p', 'comment-content', `${comment.body}`);

        commentsWrapper.appendChild(commentElement);
        commentElement.appendChild(commentLink);
        commentLink.appendChild(commentOwner);
        commentLink.appendChild(commentContent);
      }
    });

    if (!hasComments) {
      const commentContent = createElement('p', 'comment-content', 'No comments added');
      commentsWrapper.appendChild(commentContent);
    }

    if (path === `/pages/post-details/` || path === `/pages/create-post/`) {
      cardContainer.style = 'grid-template-columns: minmax(auto, 100%);';
      singlePost.removeAttribute('onclick', `window.location.href='../../pages/post-details/?id=${id}'`);
      singlePost.className = 'p-3 col-12 col-sm-8 mx-auto card rounded-0 text-light';
      singlePost.style = "max-width: 100%";

      if (path === `/pages/post-details/`) {
        const commentForm = createCommentForm();
        singlePost.appendChild(commentForm);
        createPostComment();
      }

    }
  }

  removePost(path, cardContainer);
}