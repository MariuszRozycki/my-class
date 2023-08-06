import { getPostHtml } from "./getPostHtml.mjs";


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

      const date = new Date(created);

      const localDate = date.toLocaleDateString('en-GB');
      const localTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

      const dateAndTime = `${localDate} ${localTime}`;
      console.log(dateAndTime);

      getPostHtml(media, avatar, title, body, dateAndTime, name);
    }

    return json;

  } catch (error) {
    console.log(error);
    throw error;
  }
}