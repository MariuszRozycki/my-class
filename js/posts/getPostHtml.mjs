export function getPostHtml(media, avatar, title, body, created, name) {

  const notExists = `Not exists`;
  const imgNotExists = '../../images/not-img.png';
  const avatarNotExists = '../../images/profile-default.png'

  avatar = avatar || avatarNotExists;
  // banner = banner || imgNotExists;
  media = media || imgNotExists;
  title = title || notExists;
  body = body || notExists;
  created = created || notExists;


  const cardContainer = document.querySelector('.card-container');

  cardContainer.innerHTML += `
  <div class="p-3 col-12 col-sm-6 col-md-4 card rounded-0 text-light">
    <div class="img-wrapper">
      <img src="${media}" class="card-img-top rounded-2 p-1" alt=${title}>
    </div>
    <div class="card-body p-1 d-flex flex-column justify-content-between">
      <h5 class="card-title">Title: ${title}</h5>
      <p class="card-text">Content: ${body}</p>
      <p class="card-text p-2 mt-3 text-end"><small>Created: ${created}</small></p>
      <div class="user-identification d-flex justify-content-start align-items-center">
        <div class="avatar-img-wrapper">
          <img class="rounded-circle border border-3 border-warning" src="${avatar}">
        </div>
        <p class="card-text p-2 text-wrap text-break text-start"><small>${name}</small></p>
      </div>
    </div>
  </div>
  `;
}
