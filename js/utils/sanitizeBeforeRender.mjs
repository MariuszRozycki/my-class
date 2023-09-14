/**
 * Sanitizes a string containing HTML to remove potentially malicious code.
 * 
 * This function removes <script> and <style> tags, HTML comments, and other HTML tags. 
 * It also removes certain potentially dangerous attributes like `onerror`, `onload`, `onclick`, and `onmouseover`.
 *
 * @param {string} data - The string containing HTML to sanitize.
 * @returns {string} - The sanitized HTML string.
 * @example
 * // Example usage
 * const unsafeHTML = '<script>alert("Hacked!");</script><p onclick="malicious()">Click me</p>';
 * const safeHTML = sanitizeBeforeRender(unsafeHTML);
 * // safeHTML will be '<p>Click me</p>'
 */

export function sanitizeBeforeRender(data) {
  let sanitized = data.replace(/<script[^>]*?>.*?<\/script>/gi, '')
    .replace(/<[\/\!]*?[^<>]*?>/gi, '')
    .replace(/<style[^>]*?>.*?<\/style>/gi, '')
    .replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');

  const forbiddenAttrs = ['onerror', 'onload', 'onclick', 'onmouseover'];
  for (const attr of forbiddenAttrs) {
    const regex = new RegExp(attr + '="[^"]*"', 'gi');
    sanitized = sanitized.replace(regex, '');
  }

  return sanitized;
}