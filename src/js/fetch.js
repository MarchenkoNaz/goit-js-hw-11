const BASE_URL = `https://pixabay.com/api/`;
// ?key=36018585-20849131c04f34b8cc636ef66&q=cat&image_type=all&orientation=all&safesearch=true
const KEY = `?key=36018585-20849131c04f34b8cc636ef66`;
export function fetchCountries(search, page = 1) {

	const url = `${BASE_URL}${KEY}&q=${search}&image_type=all&orientation=all&safesearch=true&page=${page}`
	return fetch(url).then(resp => {
		if (!resp.ok) {
			throw new Error(resp.statusText)
		}

		return resp.json()
	})
}