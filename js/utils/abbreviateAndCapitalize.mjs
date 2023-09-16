/**
 * Abbreviates and capitalizes the given text.
 * If the current path is `/pages/post-details/`, the text is not abbreviated.
 * Otherwise, the text is abbreviated to the first 5 words.
 * 
 * @function abbreviateAndCapitalize
 * @param {string} text - The text to be abbreviated and capitalized.
 * @returns {string} - The abbreviated and capitalized text, or 'Element not exists' if the text is null or undefined.
 * 
 * @example  
 * const text = 'This is a long sentence that needs to be abbreviated.';
 * const newText = abbreviateAndCapitalize(text);  
 * Output: 'This is a long sentence...'
 */

export function abbreviateAndCapitalize(text) {
  const notExists = 'Element not exists';

  const path = location.pathname;

  if (!text) return notExists;
  let abbreviated;
  if (path === `/pages/post-details/`) {
    abbreviated = text;
  } else {
    abbreviated = text.split(" ").slice(0, 5).join(" ");
  }

  return abbreviated.charAt(0).toUpperCase() + abbreviated.slice(1);
}