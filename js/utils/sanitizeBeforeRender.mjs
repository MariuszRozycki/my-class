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