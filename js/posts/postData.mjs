/**
 * Prepares the post data for submission.
 *
 * @param {string} title - The title of the post.
 * @param {string} body - The main content of the post.
 * @param {string} tags - A string of tags separated by commas.
 * @param {string} media - The media content, usually a URL.
 * @returns {Object} An object containing the prepared post data.
 * 
 * @example
 * // Preparing a new post
 * const title = "My New Post";
 * const body = "This is the content of my new post.";
 * const tags = "tag1, tag2, tag3";
 * const media = "https://example.com/image.jpg";
 * const myPost = postData(title, body, tags, media);
 * // myPost will be: { title: "My New Post", body: "This is the content of my new post.",
 * tags: ["tag1", "tag2", "tag3"], media: "https://example.com/image.jpg" }
 */

export function postData(title, body, tags, media) {
  const tagsArray = tags.split(',').map(tag => tag.trim());

  const postData = {
    "title": title,
    "body": body,
    "tags": tagsArray,
    "media": media
  }

  return postData;
}