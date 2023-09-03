/* import functions */
import { getLoggedUserProfile } from "./getLoggedUserProfile.mjs";

/* import url */
import { profilesUrl } from '../utils/api.mjs';


const path = location.pathname;

if (path === '/pages/profile/') {
  getLoggedUserProfile(profilesUrl);
}