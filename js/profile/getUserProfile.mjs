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
import { profilesUrl } from "../utils/api.mjs";

export async function getUserProfile(url, userName) {
  console.log('userName inside getUserProfile:', userName);
  console.log('url:', url);
  const path = location.pathname;
  try {
    let profileUserName = getLoggedUserName();
    if (userName) {
      profileUserName = userName;
    }

    const method = 'GET';
    const profileByNameUrl = `${url}/profiles/${profileUserName}?_followers=true&_following=true&_posts=true`;
    // const profileByNameUrl = `${url}/profiles/${profileUserName}/`;
    console.log('profileByNameUrl:', profileByNameUrl);

    const data = await authWithToken(method, profileByNameUrl);
    const userData = data.json;

    createProfileDataHtml(userData, url, profileUserName, method, path);

  } catch (error) {
    displayError();
    throw error;
  }
}

function createProfileDataHtml(userData, url, profileUserName, method, path, userName) {
  const { avatar, banner, email, followers, following, name, id } = userData;

  const notExists = `Not exists`;
  const imgNotExists = '../../images/not-img.png';
  const avatarNotExists = '../../images/profile-default.png';
  const nameValue = name || notExists;
  const bannerValue = banner || imgNotExists;
  const avatarValue = avatar || avatarNotExists;

  displayUserData(nameValue, bannerValue, avatarValue, email);
  displayUserPosts(profilesUrl, profileUserName, method, imgNotExists, nameValue, avatarValue, notExists, path, userName);
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

export async function displayUserPosts(url, profileUserName, method, imgNotExists, nameValue, avatarValue, notExists, path, userName) {
  console.log('profilesUrl:', profilesUrl);
  // console.log('profileUserName:', profileUserName);
  const postsByNameUrl = `${url}/${profileUserName.toLowerCase()}/posts?_author=true&_reactions=true&_comments=true`;
  // console.log('postsByNameUrl:', postsByNameUrl);
  const data = await authWithToken(method, postsByNameUrl);
  const posts = data.json;
  // console.log(posts);
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

    console.log('userName:', userName);
    console.log('profileUserName:', profileUserName);
    if (profileUserName && profileUserName === getLoggedUserName()) {
      removeButton.style = 'display: block';
      updateButton.style = 'display: block';
    } else {
      removeButton.style = 'display: none';
      updateButton.style = 'display: none';
    }

    // if (userName !== profileUserName) {
    //   removeButton.style = 'display: none';
    //   updateButton.style = 'display: none';
    // }

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
  removePost(path, cardContainer, url, profileUserName, method, imgNotExists, nameValue, avatarValue);
}