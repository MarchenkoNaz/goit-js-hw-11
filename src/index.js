import { Notify } from "notiflix"
import { fetchPhotos } from "./js/fetch";
import { createMarkup, removeMarkup, innerMarkup } from "./js/markup";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



//!intializing html elements
const refEl = {
	formSearch: document.querySelector('.search-form'),
	inputForm: document.querySelector('.search-input'),
	gallery: document.querySelector('.gallery'),
	btnLoadMore: document.querySelector('.load-more'),
	guard: document.querySelector('.js-guard'),
}

refEl.formSearch.addEventListener('submit', onSearch)
// refEl.btnLoadMore.addEventListener('click', onClick)

let currentPage = 1
const search = refEl.inputForm
// function onClick() {

// 	currentPage += 1
// 	fetchPhotos(search.value, currentPage).then(data => {

// 		const totalPages = parseInt(data.totalHits / 40)

// 		if (currentPage === totalPages) {
// 			Notify.info(`We're sorry, but you've reached the end of search results.`)
// 			return
// 		}

// 		if (!data.hits.length) {
// 			Notify.failure("Sorry, there are no images matching your search query. Please try again.")
// 			return
// 		}

// 		if (data.hits.length) {
// 			refEl.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits))
// 			galleryLightBox.refresh()
// 		}
// 	}
// 	).catch(error => console.log(error))
// 	return;
// }

const galleryLightBox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250, })

// Infinity scroll
const options = {
	rootMargin: '200px',
};

let observer = new IntersectionObserver(onPagination, options)

function onPagination(entries, observer) {
	entries.forEach(async entry => {
		const searchTrim = search.value.trim()

		if (entry.isIntersecting) {
			currentPage += 1

			try {
				const data = await fetchPhotos(searchTrim, currentPage)
				if (data.totalHits <= refEl.gallery.children.length) {
					Notify.failure("We're sorry, but you've reached the end of search results.")
					disconnectIntersectionObserver();
					return
				}

				refEl.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits))
				galleryLightBox.refresh()
				observer.observe(refEl.guard)
			}
			catch (err) {
				Notify.failure('Error')
				console.log(err);
			}
		}
	})
}

function disconnectIntersectionObserver() {
	if (observer) {
		observer.disconnect();
	}
}

async function onSearch(evt) {
	evt.preventDefault()
	removeMarkup(refEl.gallery)

	currentPage = 1
	const searchTrim = search.value.trim()

	if (!searchTrim) {
		Notify.failure('Write what you want to find.')
		return;
	}

	disconnectIntersectionObserver();

	try {
		const data = await fetchPhotos(searchTrim, currentPage)

		if (data.totalHits <= refEl.gallery.children.length) {
			Notify.failure("Sorry, there are no images matching your search query. Please try again.")
			return
		}

		Notify.info(`Hooray! We found ${data.totalHits} images.`)

		refEl.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits))
		galleryLightBox.refresh()
		observer.observe(refEl.guard)
	}
	catch (err) {
		Notify.failure('Error')
		console.log(err);
	}
}


