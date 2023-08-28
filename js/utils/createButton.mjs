import { createElement } from "./createElement.mjs";

export function createButton(className, dataId, innerHTML) {
  const button = createElement('button', className, innerHTML);
  if (dataId) button.setAttribute('data-id', dataId);
  return button;
}