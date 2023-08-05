import { createPostsHtml } from "./createPostHtml.mjs";

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
      const { body, created, media, title, } = post;

      console.log(post);
      createPostsHtml(media, title, body, created);
    }

    return json;

  } catch (error) {
    console.log(error);
    throw error;
  }
}




