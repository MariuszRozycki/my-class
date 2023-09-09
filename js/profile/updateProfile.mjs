import { mediaProfileData } from "./mediaProfileData.mjs";
import { authWithToken } from "../authentication/authWithToken.mjs";
import { createElement } from "../utils/createElement.mjs";
import { displayError } from "../utils/displayError.mjs";

export async function updateProfile(url) {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const userName = params.get("userName");

  const profileByUrl = `${url}/${userName}`;

  let currentMediaData;

  try {
    const data = await authWithToken('GET', profileByUrl);
    currentMediaData = data.json;
  } catch (error) {
    displayError();
    throw error;
  }

  const { banner, avatar } = currentMediaData;

  const updateMediaForm = document.querySelector('#update-media-form');
  const bannerInput = document.querySelector('#update-media-banner');
  const avatarInput = document.querySelector('#update-media-avatar');
  const profileMediaContainer = document.querySelector('#profile-media-message-container');
  const backToProfileBtn = document.querySelector('.to-profile-btn');

  bannerInput.value = banner || '';
  avatarInput.value = avatar || '';

  const updateProfileUrl = `${url}/${userName}/media`;

  updateMediaForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const bannerInputValue = bannerInput.value;
    const avatarInputValue = avatarInput.value;
    const method = 'PUT';
    const json = mediaProfileData(bannerInputValue, avatarInputValue);

    try {
      await authWithToken(method, updateProfileUrl, json);

      const messageParagraph = createElement('p', 'nothing-to-display', 'Your profile media has been updated');
      profileMediaContainer.innerHTML = '';
      profileMediaContainer.prepend(messageParagraph);
      backToProfileBtn.classList.remove('hidden');
      backToProfileBtn.addEventListener('click', () => { window.location.href = `../../pages/profile/?userName=${userName}` });

    }
    catch (error) {
      displayError();
      throw error;
    }
  });
}
