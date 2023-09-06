import { createElement } from "./createElement.mjs";

export function createButton(className, dataId, innerHTML, ownerOfComment) {
  const button = createElement('button', className, innerHTML);
  if (dataId) button.setAttribute('data-id', dataId);
  if (ownerOfComment) button.setAttribute('comment-owner', ownerOfComment);
  return button;
}