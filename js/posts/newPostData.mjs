export function newPostData(newTitle, newBody, newTag, newMedia) {
  const tagsArray = newTag.split(',').map(tag => tag.trim());

  const newPost = {
    "title": newTitle,
    "body": newBody,
    "tags": tagsArray,
    "media": newMedia
  }

  return newPost;
}