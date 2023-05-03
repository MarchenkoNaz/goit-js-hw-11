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
//!intializing html elements
const refEl = {
	formSearch: document.querySelector('.search-form'),
	inputForm: document.querySelector('.search-input'),
	btnSearch: document.querySelector('.search-btn'),
	gallery: document.querySelector('.gallery'),
	btnLoadMore: document.querySelector('.load-more')
}
