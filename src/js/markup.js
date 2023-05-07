export function createMarkup(arr) {
	return arr.map(el => `<div class="photo-card">
	<a class="gallery__link" href="${el.largeImageURL}"><img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
	<div class="info">
	  <p class="info-item">
		<b>Likes</b>
		${el.likes}
	  </p>
	  <p class="info-item">
		<b>Views</b>
		${el.views}
	  </p>
	  <p class="info-item">
		<b>Comments</b>
		${el.comments}
	  </p>
	  <p class="info-item">
		<b>Downloads</b>
		${el.downloads}
	  </p>
	</div>
  </div>`).join('')
}

export function innerMarkup(place, markup) {
	return place.innerHTML = markup
}

export function removeMarkup(place) {
	return place.innerHTML = ''
}