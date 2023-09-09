/* import functions */
import { getUserProfile } from "./getUserProfile.mjs";
import { getProfileByName } from "./getProfileByName.mjs";
import { updateProfile } from "./updateProfile.mjs";

/* import url */
import { baseApi, profilesUrl } from "../utils/api.mjs";



const path = location.pathname;

if (path === '/pages/profile/') {
  getUserProfile(baseApi);
}
if (path === '/pages/profileByName/') {
  getProfileByName(baseApi, path);
}
if (path === '/pages/update-profile-media/') {
  updateProfile(profilesUrl);
}