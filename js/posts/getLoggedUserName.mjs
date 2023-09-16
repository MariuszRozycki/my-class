/**
 * Retrieves the logged-in user's name from local storage.
 *
 * This function reads a serialized JSON object from the 'USER_DATA' key in the local storage,
 * parses it into a JavaScript object, and then returns the value associated with the 'name' field.
 * 
 * @returns {string} The name of the logged-in user.
 * 
 * @example
 * const userName = getLoggedUserName();
 */

export function getLoggedUserName() {
  const userLocalStorage = localStorage.getItem('USER_DATA');
  const userParsed = JSON.parse(userLocalStorage);
  const loggedUserName = userParsed.name;

  return loggedUserName;
}