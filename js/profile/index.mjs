/* import functions */
import { getUserProfile } from "./getUserProfile.mjs";
import { getProfileByName } from "./getProfileByName.mjs";

/* import url */
import { baseApi } from "../utils/api.mjs";
// import { profilesUrl } from '../utils/api.mjs';


const path = location.pathname;

if (path === '/pages/profile/') {
  getUserProfile(baseApi);
}
if (path === '/pages/profileByName/') {
  console.log(path);
  getProfileByName(baseApi, path);
}