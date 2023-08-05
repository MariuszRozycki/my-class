export function createPostsHtml(media, title, body, created, author) {

  const notExists = `Not exists`;
  const imgNotExists = '../../images/not-img.png';

  media = media || imgNotExists;
  title = title || notExists;
  body = body || notExists;
  created = created || notExists;


  const containerCardGroup = document.querySelector('.card-group');

  containerCardGroup.innerHTML += `
    <div class="card rounded-0 text-light">
      <div class="img-wrapper">
        <img src=${media} class="card-img-top rounded-2 p-1" alt=${title}>
      </div>
      <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${body}</p>
        <p class="card-text p-2 mt-3 text-end"><small>${created}</small>
        <p class="card-text p-2 mt-3 text-start"><small>KK</small>
        </p>
      </div>
    </div>
  `;
}