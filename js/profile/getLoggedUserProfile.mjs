import { authWithToken } from "../authentication/authWithToken.mjs";
import { getLoggedUserName } from "../posts/getLoggedUserName.mjs";
import { createElement } from "../utils/createElement.mjs";
import { createButton } from "../utils/createButton.mjs";
import { createImgWrapper } from "../utils/createImgWrapper.mjs";
import { abbreviateAndCapitalize } from "../utils/abbreviateAndCapitalize.mjs";
import { createUserIdentification } from "../utils/createUserIdentification.mjs";
import { createPostBody } from "../utils/createPostBody.mjs";
import { renderDateAndTime } from "../utils/renderDateAndTime.mjs";
import { removeComment } from "../posts/removeComment.mjs";
import { removePost } from "../posts/removePost.mjs";
import { displayError } from "../utils/displayError.mjs";

export async function getLoggedUserProfile(url) {
  try {
    const loggedUserName = getLoggedUserName();
    const method = 'GET';
    const profileByNameUrl = `${url}/${loggedUserName}?_followers=true&_following=true&_posts=true`;

    const data = await authWithToken(method, profileByNameUrl);
    const userData = data.json;

    createProfileDataHtml(userData, url, loggedUserName, method);

  } catch (error) {
    displayError();
    throw error;
  }
}

function createProfileDataHtml(userData, url, loggedUserName, method) {
  const { avatar, banner, email, followers, following, name, id } = userData;

  const notExists = `Not exists`;
  const imgNotExists = '../../images/not-img.png';
  const avatarNotExists = '../../images/profile-default.png';
  const nameValue = name || notExists;
  const bannerValue = banner || imgNotExists;
  const avatarValue = avatar || avatarNotExists;

  displayUserData(nameValue, bannerValue, avatarValue, email);
  displayUserPosts(url, loggedUserName, method, imgNotExists, nameValue, avatarValue, notExists);
}

function displayUserData(nameValue, bannerValue, avatarValue, email) {
  const userDataContainer = document.querySelector('#user-data-container');
  const imgWrapper = createElement('div', 'img-wrapper-profile');
  const bannerImgWrapper = createElement('div', 'banner-img-wrapper');
  const bannerImg = createElement('img');
  bannerImg.src = bannerValue;
  const profileImg = createElement('img');
  profileImg.src = avatarValue;
  const userProfileDataWrap = createElement('div', 'user-profile-data-wrap');
  const userName = createElement('p', 'user-name');
  userName.innerText = `${abbreviateAndCapitalize(nameValue)}`;
  userProfileDataWrap.appendChild(userName);
  const userEmail = createElement('a', 'user-email');
  userEmail.innerText = `${email}`;
  userProfileDataWrap.appendChild(userEmail);
  userDataContainer.appendChild(bannerImgWrapper);
  bannerImgWrapper.appendChild(bannerImg);
  userDataContainer.appendChild(imgWrapper);
  imgWrapper.appendChild(profileImg);
  userDataContainer.appendChild(userProfileDataWrap);
}

export async function displayUserPosts(url, loggedUserName, method, imgNotExists, nameValue, avatarValue, notExists) {
  const postsByNameUrl = `${url}/${loggedUserName}/posts?_author=true&_reactions=true&_comments=true`;
  const data = await authWithToken(method, postsByNameUrl);
  const posts = data.json;
  const path = location.pathname;
  const cardContainer = document.querySelector('.card-container');

  if (posts.length === 0) {
    cardContainer.innerHTML = `<p class='no-posts'>You don't have any posts.</p>`;
  }

  for (let post of posts) {
    console.log(post);

    const { id, media, title, body, created, tags, comments } = post;
    console.log('comments:', comments);

    const tagsList = tags.join(', ');

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

    cardContainer.appendChild(singlePost);
    singlePost.appendChild(postContentWrapper);
    postContentWrapper.append(userIdentification, imgWrapper, postBody);

    let hasComments = false;

    comments.forEach(comment => {
      const { id: commentId, body: commentBody, owner: ownerOfComment } = comment;
      if (comment) {
        // console.log(comment);
        hasComments = true;

        const commentElement = createElement('li', 'card-text comment-element');
        commentElement.setAttribute('data-comment-id', commentId);
        const commentLink = createElement('a', 'comment-link');
        const commentOwner = createElement('p', 'comment-owner', `@${ownerOfComment}`);
        const commentContent = createElement('p', 'comment-content', `${commentBody}`);
        const removeCommentButton = createButton('remove-comment-button', `${commentId}`, 'X');

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
  }
  removePost(path, cardContainer, url, loggedUserName, method, imgNotExists, nameValue, avatarValue);
}