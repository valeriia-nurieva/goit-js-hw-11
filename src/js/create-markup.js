export function createMarkup(array) {
    return array.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>
        `<a class="gallery-item list" href="${largeImageURL}"><div class="photo-card">
  <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span class="info-count">${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span class="info-count">${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span class="info-count">${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span class="info-count">${downloads}</span>
    </p>
  </div>
</div></a>`
    ).join('');
}