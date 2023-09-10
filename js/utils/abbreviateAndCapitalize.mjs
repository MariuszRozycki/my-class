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