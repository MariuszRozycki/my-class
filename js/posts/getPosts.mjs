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
    if (response.status === 403) {
      console.error('Błąd 403: Dostęp zabroniony');
      console.error(await response.text()); // Może zawierać więcej szczegółów na temat błędu
    } else if (!response.ok) {
      console.error('Wystąpił błąd:', response.status, response.statusText);
    } else {
      const json = await response.json();

      for (let post of json) {
        const { media, body, created, title, author: { name, avatar } } = post;

        renderPostHtml(media, avatar, title, body, created, name);
      }

      return json;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}