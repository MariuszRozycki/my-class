import { createElement } from "./createElement.mjs";

export const displayError = (message = "Something is wrong! Contact with tlf 939 28 270", error) => {
  const body = document.getElementsByTagName('body')[0];

  const errorMessage = `${message} ${error ? error.toString() : ''}`;
  const errorContainer = createElement('p', 'display-error', errorMessage);
  body.appendChild(errorContainer);
}
