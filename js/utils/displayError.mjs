import { createElement } from "./createElement.mjs";

/**
 * Function displayError displays an error message on the webpage.
 * It takes an error object and an optional message string as parameters.
 * The function creates an HTML element containing the error message and appends it to the error container.
 * 
 * @function displayError
 * @param {string} error - The error from catch block.
 * @param {string} message - "Something is wrong! - The custom message to display. Optional.
 * 
 * @example
 * displayError('Error catch from catch block', 'Failed to fetch data!');
 * 
 * // Or just with a custom message:
 * displayError(null, 'Something went wrong!');
 */

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

