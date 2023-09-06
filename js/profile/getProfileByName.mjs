import { getUserProfile } from './getUserProfile.mjs';

export function getProfileByName(url) {
  // console.log(path);
  console.log('url inside getProfileByName:', url);
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const userName = params.get("userName");
  // console.log('userName:', userName);
  getUserProfile(url, userName);
}