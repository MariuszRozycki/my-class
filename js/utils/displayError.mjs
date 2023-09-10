import { createElement } from "./createElement.mjs";

export const displayError = (error, message = "Something is wrong!" + "<br>" + "Contact with tlf 939 28 270" + "<br>") => {
  const errorMessage = `${error ? ': ' + error.toString() : ''} ${message}`;
  const existingError = document.querySelector('.display-error');
  if (existingError) {
    existingError.remove();
  }

  const errorContainerWrapper = document.querySelector('.error-wrap');
  const errorContainer = createElement('p', 'display-error mt-2', errorMessage);
  errorContainerWrapper.appendChild(errorContainer);
}