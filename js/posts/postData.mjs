export function postData(title, body, tags, media) {
  const tagsArray = tags.split(',').map(tag => '#' + tag.trim());

  const postData = {
    "title": title,
    "body": body,
    "tags": tagsArray,
    "media": media
  }

  return postData;
}