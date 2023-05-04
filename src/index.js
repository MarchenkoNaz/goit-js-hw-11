/* Tasks for 11 hw
1)Create form for searching and stylized it | DONE
2)HTTP query use Pixabay
	- registration and get unique key 
	- read the documentation
	- MUST USE THIS PARAMETRS
		- key, q,image_type, orientation, safesearch(true)
	- in response I'll get an object, use this keys
		- webformatURL
		- largeImageUrl
		- tags
		- likes
		- views
		- comments
		- downloads
	- if response is empty show message "Sorry, there are no images matching your search query. Please try again." (Notiflix)
	- in every next seacrh '#gallery' must be clean
	- use pagination 40 object in one query
	- button 'load more' on start must be hidden
	- use property 'totalHits' and at the ending of all photos hide button and show message 'We're sorry, but you've reached the end of search results.' 
*/
import { Notify } from "notiflix"
import { fetchCountries } from "./js/fetch";

//!intializing html elements
const refEl = {
	formSearch: document.querySelector('.search-form'),
	inputForm: document.querySelector('.search-input'),
	btnSearch: document.querySelector('.search-btn'),
	gallery: document.querySelector('.gallery'),
	btnLoadMore: document.querySelector('.load-more')
}
let currentPage = 1;


refEl.formSearch.addEventListener('submit', onSearch)

refEl.btnLoadMore.hidden = true;

function onSearch(evt) {
	evt.preventDefault()
	const search = refEl.inputForm.value.trim()

	//check on empty input

	if (!search) {
		Notify.failure('Write a text what you want to find.')
		return;
	}
	fetchCountries(search).then(data => {
		if (!data.hits.length) {
			Notify.failure("Sorry, there are no images matching your search query. Please try again.")
			return
		}
		if (data.hits.length) {
			innerMarkup(refEl.gallery, createMarkup(data.hits))
			refEl.btnLoadMore.hidden = false
			refEl.btnLoadMore.addEventListener('click', onLoadMore)
		}
	}
	).catch()
	return;
}

function createMarkup(arr) {
	return arr.map(el => `<div class="photo-card">
	<img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
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

function innerMarkup(place, markup) {
	return place.innerHTML = markup
}

function removeMarkup(place) {
	return place.innerHTML = ''
}

function onLoadMore(currentPage = 1) {
	currentPage += 1
	fetchCountries(currentPage)
}
const options = {
	root: document.querySelector('.js-guard'),
	rootmargin: "0px",
	threshold: 1.0,
}
let observer = new IntersectionObserver(cb, options)
