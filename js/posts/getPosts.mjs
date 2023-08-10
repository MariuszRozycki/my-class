import { renderPostHtml } from "./renderPostHtml.mjs";

export async function getPosts(url) {
  try {
    const token = localStorage.getItem('ACCESS_TOKEN');

    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, fetchOptions);
    const json = await response.json();

    for (let post of json) {
      const { media, body, created, title, author: { name, avatar } } = post;

      await renderPostHtml(media, avatar, title, body, created, name);
    }

    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
