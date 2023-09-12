import { mediaProfileData } from "./mediaProfileData.mjs";
import { authWithToken } from "../authentication/authWithToken.mjs";
import { createElement } from "../utils/createElement.mjs";
import { displayError } from "../utils/displayError.mjs";


/**
 * Updates the user's profile media (banner and avatar) based on the form input.
 * Fetches the current media data, pre-fills the form with it, and updates the media upon form submission.
 * 
 * @async
 * @function updateProfile
 * @param {string} url - The base URL for the profile API endpoint.
 * @throws Will throw an error if any operation fails.
 * 
 * @example  
 * const url = 'https://api.example.com/profiles';
 * await updateProfile(url);
 */
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

    try {
      const method = 'PUT';
      const dataUrl = mediaProfileData(bannerInputValue, avatarInputValue);

      const json = await authWithToken(method, updateProfileUrl, dataUrl);

      const jsonBadRequest = json.json.status

      if (jsonBadRequest) {
        const jsonErrors = json.json.errors;

        for (let error of jsonErrors) {
          let errorMessage = error.message;

          const errorParagraph = createElement('p', 'error', `${errorMessage}`);
          profileMediaContainer.innerHTML = '';
          profileMediaContainer.prepend(errorParagraph);
        }
      } else {
        const messageParagraph = createElement('p', 'nothing-to-display', 'Your profile media has been updated');
        profileMediaContainer.innerHTML = '';
        profileMediaContainer.prepend(messageParagraph);
        backToProfileBtn.classList.remove('hidden');
        backToProfileBtn.addEventListener('click', () => { window.location.href = `../../pages/profile/?userName=${userName}` });
      }
    }
    catch (error) {
      displayError(error);
      throw error;
    }
  });
}
