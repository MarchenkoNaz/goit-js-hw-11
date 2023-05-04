const BASE_URL = `https://pixabay.com/api/`;
// ?key=36018585-20849131c04f34b8cc636ef66&q=cat&image_type=all&orientation=all&safesearch=true
const KEY = `?key=36018585-20849131c04f34b8cc636ef66`;
export async function fetchCountries(search, page = 1) {

	const url = `${BASE_URL}${KEY}&q=${search}&image_type=all&orientation=horizontal&safesearch=true&page=${page}`
	const resp = await fetch(url);
	if (!resp.ok) {
		throw new Error(resp.statusText);
	}
	return await resp.json();
}