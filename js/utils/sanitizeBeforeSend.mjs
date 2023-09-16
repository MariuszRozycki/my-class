/**
 * Sanitizes a string by encoding certain characters and removing forbidden keywords.
 *
 * This function encodes special HTML characters like `&`, `<`, `>`, `"`, and `'` into their respective HTML entities.
 * It also removes potentially dangerous keywords such as 'onerror', 'onload', 'script', 'img', and 'body'.
 *
 * @function sanitizeBeforeSend
 * @param {string} str - The input string to sanitize.
 * @returns {string} - The sanitized string.
 * @example
 * // Example usage
 * const unsafeString = 'Hello <script>onerror=evil()</script>';
 * const safeString = sanitizeBeforeSend(unsafeString);
 * // safeString will be 'Hello '
 */

export function sanitizeBeforeSend(str) {
  let sanitized = str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const forbiddenKeywords = ['onerror', 'onload', 'script', 'img', 'body'];
  for (const keyword of forbiddenKeywords) {
    const regex = new RegExp(keyword, 'gi');
    sanitized = sanitized.replace(regex, '');
  }

  return sanitized;
}