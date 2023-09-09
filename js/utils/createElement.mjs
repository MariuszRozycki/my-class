export function createElement(tag, className, innerHTML, ownerOfComment) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (innerHTML) element.innerHTML = innerHTML;
  if (ownerOfComment) element.setAttribute('comment-owner', ownerOfComment);
  return element;
}