export function getLoggedUserName() {
  const userLocalStorage = localStorage.getItem('USER_DATA');
  const userParsed = JSON.parse(userLocalStorage);
  const loggedUserName = userParsed.name;

  return loggedUserName;
}