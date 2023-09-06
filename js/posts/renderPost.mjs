/**
 * Function to render posts on a webpage. This function can render multiple posts or a single post
 * depending on the data received. It also has various checks to render the post differently based
 * on the current URL path. 
 * 
 * @param {Array|Object} data - The post data to be rendered. Can either be an array of post objects or a single post object.
 * Each post object should contain the properties: id, media, body, created, title, tags, author, and comments.
 * 
 * @example
 * // Render multiple posts
 * const postData = [
 *  { id: 1, media: 'image.jpg', body: 'some text', created: 'some date', title: 'Title', tags: ['tag1'], author: { name: 'John', avatar: 'avatar.jpg' }, comments: [] },
 *  { id: 2, media: 'image2.jpg', body: 'some text 2', created: 'some other date', title: 'Another Title', tags: ['tag2'], author: { name: 'Doe', avatar: 'avatar2.jpg' }, comments: [] }
 * ];
 * renderPost(postData);
 * 
 * // Render single post
 * const singlePostData = { id: 1, media: 'image.jpg', body: 'some text', created: 'some date', title: 'Title', tags: ['tag1'], author: { name: 'John', avatar: 'avatar.jpg' }, comments: [] };
 * renderPost(singlePostData);
 */

import { createElement } from "../utils/createElement.mjs";
import { createButton } from "../utils/createButton.mjs";
import { createImgWrapper } from "../utils/createImgWrapper.mjs";
import { abbreviateAndCapitalize } from "../utils/abbreviateAndCapitalize.mjs";
import { renderDateAndTime } from "../utils/renderDateAndTime.mjs";
import { getLoggedUserName } from "./getLoggedUserName.mjs";
import { removePost } from "./removePost.mjs";
import { createPostComment } from "./createPostComment.mjs";
import { createPostBody } from "../utils/createPostBody.mjs";
import { createUserIdentification } from "../utils/createUserIdentification.mjs";
import { createCommentForm } from "../utils/createCommentForm.mjs";
import { removeComment } from "./removeComment.mjs";
import { getProfileByName } from "../profile/getProfileByName.mjs";
import { baseApi } from "../utils/api.mjs";

export async function renderPost(data) {
  console.log(data);

  if (!Array.isArray(data)) data = [data];

  const postIdFromUrl = new URLSearchParams(window.location.search).get('id');

  const loggedUser = getLoggedUserName();
  const cardContainer = document.querySelector('.card-container');
  // cardContainer.innerHTML = '';
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

    userIdentification.addEventListener('click', e => { // working on
      e.preventDefault();
      e.stopPropagation();
      if (e.target.closest('.user-identification')) {
        const userName = name;
        console.log(userName);
        window.location.href = `../../pages/profileByName/?userName=${userName}`;
        // console.log('window.location.href:', window.location.href);
      }
    })

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
      const { id: commentId, body: commentBody, owner: ownerOfComment } = comment;
      if (comment) {
        // console.log(comment);
        hasComments = true;
        const commentElement = createElement('li', 'card-text comment-element', '', `${ownerOfComment}`);
        commentElement.setAttribute('data-comment-id', commentId);
        const commentLink = createElement('a', 'comment-link');
        const commentOwner = createElement('p', 'comment-owner', `@${ownerOfComment}`);
        const commentContent = createElement('p', 'comment-content', `${commentBody}`);
        const removeCommentButton = createButton('remove-comment-button', `${commentId}`, 'X', `${ownerOfComment}`);

        commentsWrapper.appendChild(commentElement);
        commentElement.appendChild(commentLink);
        commentElement.appendChild(removeCommentButton);
        commentLink.appendChild(commentOwner);
        commentLink.appendChild(commentContent);

        removeComment();
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
        createPostComment(cardContainer);
      }
    }
  }

  removePost(path, cardContainer);
}