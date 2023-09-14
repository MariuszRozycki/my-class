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
