/* import functions */
import { getUserProfile } from "./getUserProfile.mjs";
import { getProfileByName } from "./getProfileByName.mjs";
import { updateProfile } from "./updateProfile.mjs";
import { searchHandler } from "../utils/searchHandler.mjs";

/* import url */
import { profilesUrl } from "../utils/api.mjs";
import { baseApi } from "../utils/api.mjs";

const path = location.pathname;

if (path === '/pages/profile/') {
  getUserProfile();
  searchHandler();
}
if (path === '/pages/profileByName/') {
  getProfileByName(path);
  searchHandler();
}
if (path === '/pages/update-profile-media/') {
  updateProfile(profilesUrl);
}