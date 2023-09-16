import { getUserProfile } from './getUserProfile.mjs';

export function getProfileByName() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const userName = params.get("userName");

  getUserProfile(userName);
}