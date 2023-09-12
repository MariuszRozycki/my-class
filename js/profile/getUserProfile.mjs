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
import { baseApi } from "../utils/api.mjs";

/**
 * Fetches and displays the user profile based on the username.
 * 
 * @async
 * @function getUserProfile
 * @param {string} userName - The username of the user whose profile is to be fetched.
 * @throws Will throw an error if any operation fails.
 * 
 * @example  
 * await getUserProfile('pawel_stafanowski');
 */


export async function getUserProfile(userName) {
  const path = location.pathname;
  try {
    let loggedUser = getLoggedUserName();
    if (userName) {
      loggedUser = userName;
    }

    const method = 'GET';
    const profileByNameUrl = `${baseApi}/profiles/${loggedUser}?_followers=true&_following=true&_posts=true`;

    const data = await authWithToken(method, profileByNameUrl);
    const userData = data.json;

    createProfileDataHtml(userData, baseApi, loggedUser, method, path);

  } catch (error) {
    displayError(error);
    throw error;
  }
}



/**
 * Creates and inserts HTML elements to display user profile data.
 * 
 * @function createProfileDataHtml
 * @param {Object} userData - The user data object.
 * @param {string} baseApi - The base API URL.
 * @param {string} loggedUser - The username of the logged-in user.
 * @param {string} method - The HTTP method used for API requests.
 * @param {string} path - The current URL path.
 */
function createProfileDataHtml(userData, baseApi, loggedUser, method, path) {

  const { avatar, banner, email, followers, following, name, id } = userData;

  const containerFollowersList = document.querySelector('.wrapper-followers-list');
  if (followers.length < 1) {
    containerFollowersList.innerHTML = `<p class="nothing-to-display">You don't have any followers :(</p>`;
  } else {
    let listItems = '';
    let sum = 0;
    let sumOneMore = ++sum;
    for (let follower of followers) {
      const { avatar, name } = follower;
      listItems += `<li><a href="../../pages/profile-by-name/?userName=${name}">${sumOneMore}. ${name}</a></li>`;
    }
    containerFollowersList.innerHTML = listItems;

  }

  const notExists = `Not exists`;
  const imgNotExists = '../../images/not-img.png';
  const avatarNotExists = '../../images/profile-default.png';
  const nameValue = name || notExists;
  const bannerValue = banner || imgNotExists;
  const avatarValue = avatar || avatarNotExists;


  displayUserData(nameValue, bannerValue, avatarValue, email, loggedUser);
  displayUserPosts(profilesUrl, loggedUser, method, imgNotExists, nameValue, avatarValue, notExists, path);
}


/**
 * Displays user data on the profile page.
 * 
 * @function displayUserData
 * @param {string} nameValue - The name of the user.
 * @param {string} bannerValue - The banner image URL.
 * @param {string} avatarValue - The avatar image URL.
 * @param {string} email - The email of the user.
 * @param {string} loggedUser - The username of the logged-in user.
 */
function displayUserData(nameValue, bannerValue, avatarValue, email, loggedUser) {
  const loggedUserHeader = document.querySelector('.profile-of-user');
  const userDataContainer = document.querySelector('#user-data-container');
  const imgWrapper = createElement('div', 'img-wrapper-profile');
  const bannerImgWrapper = createElement('div', 'banner-img-wrapper');
  const bannerImg = createElement('img');
  bannerImg.src = bannerValue;
  const profileImg = createElement('img');
  profileImg.src = avatarValue;
  const userProfileDataWrap = createElement('div', 'user-profile-data-wrap');
  const updateProfileBtn = createButton('btn btn-my profile-btn', '', 'Update profile');
  const userName = createElement('p', 'user-name');
  userName.innerText = `${abbreviateAndCapitalize(nameValue)}`;
  userProfileDataWrap.appendChild(userName);
  const userEmail = createElement('a', 'user-email');
  userEmail.innerText = `${email}`;
  userProfileDataWrap.appendChild(userEmail);

  const nameCapAbb = abbreviateAndCapitalize(nameValue);
  loggedUserHeader.innerHTML = 'Profile of: ' + '<br>' + nameCapAbb;
  console.log(nameCapAbb);
  if (loggedUser && loggedUser === getLoggedUserName()) {
    loggedUserHeader.innerText = `My Profile`;
    userProfileDataWrap.appendChild(updateProfileBtn);
    updateProfileBtn.addEventListener('click', function () {
      window.location.href = `../../pages/update-profile-media/?userName=${loggedUser}`;
    });
  }

  userDataContainer.appendChild(bannerImgWrapper);
  bannerImgWrapper.appendChild(bannerImg);
  userDataContainer.appendChild(imgWrapper);
  imgWrapper.appendChild(profileImg);
  userDataContainer.appendChild(userProfileDataWrap);
}



/**
 * Fetches and displays posts of a user.
 * 
 * @async
 * @function displayUserPosts
 * @param {string} url - The URL for fetching posts.
 * @param {string} loggedUser - The username of the logged-in user.
 * @param {string} method - The HTTP method used for API requests.
 * @param {string} imgNotExists - The default image URL when no image exists.
 * @param {string} nameValue - The name of the user.
 * @param {string} avatarValue - The avatar image URL.
 * @param {string} notExists - The default value when a field does not exist.
 * @param {string} path - The current URL path.
 * @throws Will throw an error if any operation fails.
 */
export async function displayUserPosts(url, loggedUser, method, imgNotExists, nameValue, avatarValue, notExists, path) {
  const postsByNameUrl = `${url}/${loggedUser}/posts?_author=true&_reactions=true&_comments=true`;
  const data = await authWithToken(method, postsByNameUrl);
  const posts = data.json;
  const profileCardContainer = document.querySelector('.card-container');

  if (posts.length === 0) {
    const noPostsMessage = createElement('p', 'nothing-to-display', `You don't have any posts.`);
    const createPostBtn = createButton('btn btn-my profile-btn mx-auto', '', 'Create Post');
    profileCardContainer.append(createPostBtn);
    profileCardContainer.prepend(noPostsMessage);

    createPostBtn.addEventListener('click', () => {
      window.location.href = `../../pages/create-post`;
    });
  }

  for (let post of posts) {

    const { id, media, title, body, created, tags, comments } = post;

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
    const followButton = createButton('my-btn follow-btn', id, 'Follow');

    const removeButton = createButton('remove-post-button', id, 'X');
    const updateButton = createButton('update-post-button', id, 'Update post');

    functionalButtonsWrapper.append(updateButton, removeButton);
    singlePost.prepend(functionalButtonsWrapper);

    const imgWrapper = createImgWrapper(mediaValue, titleCapAbb);
    const userIdentification = createUserIdentification(nameCapAbb, avatarValue);
    const { postBody, commentsWrapper } = createPostBody(titleCapAbb, bodyCapAbb, tagsList, dateInNorway);

    if (loggedUser && loggedUser === getLoggedUserName()) {
      removeButton.style = 'display: block';
      updateButton.style = 'display: block';
    } else {
      removeButton.style = 'display: none';
      updateButton.style = 'display: none';
      functionalButtonsWrapper.append(followButton);
      functionalButtonsWrapper.style = 'justify-content: flex-end';
    }

    postContentWrapper.addEventListener('click', () => {
      window.location.href = `../../pages/post-details/?id=${id}`;
    });

    updateButton.addEventListener('click', e => {
      if (e.target.closest('.update-post-button')) {
        window.location.href = `../../pages/update/?id=${id}`;
      }
    });

    profileCardContainer.appendChild(singlePost);
    singlePost.appendChild(postContentWrapper);
    postContentWrapper.append(userIdentification, imgWrapper, postBody);

    let hasComments = false;

    comments.forEach(comment => {
      const { id: commentId, body: commentBody, owner: ownerOfComment } = comment;
      if (comment) {
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
  }
  removePost(path, profileCardContainer, url, loggedUser, method, imgNotExists, nameValue, avatarValue);
}