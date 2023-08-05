export async function createPost(url, data) {
  try {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(url, fetchOptions);
    const json = await response.json();

    console.log(json);
    // for (let post of json) {
    //   const { body, created, media, title, } = post;

    //   console.log(post);
    //   createPostsHtml(media, title, body, created);
    // }

    return json;

  } catch (error) {
    console.log(error);
    throw error;
  }
}

const data = {
  "title": "Test title",
  "body": "This is it",
  "tags": [
    "JEAH"
  ],
  "media": "https://imgur.com/a/AucSqJ6"
}



