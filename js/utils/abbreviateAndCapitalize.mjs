export function abbreviateAndCapitalize(text) {
  if (!text) return notExists;
  const abbreviated = text.split(" ").slice(0, 5).join(" ");

  return abbreviated.charAt(0).toUpperCase() + abbreviated.slice(1);
}