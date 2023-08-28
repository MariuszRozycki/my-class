import { createElement } from "./createElement.mjs";

export function createImgWrapper(mediaValue, titleCapAbb) {
  const imgWrapper = createElement('div', 'img-wrapper');
  const img = createElement('img', 'card-img-top rounded-2');
  img.src = mediaValue;
  img.alt = `Here should be img of: ${titleCapAbb}`;
  imgWrapper.appendChild(img);
  return imgWrapper;
}