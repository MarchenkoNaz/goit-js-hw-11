import axios from 'axios';
const BASE_URL = `https://pixabay.com/api/`;
const KEY = `?key=36018585-20849131c04f34b8cc636ef66`;
export async function fetchPhotos(search, page = 1) {

	const url = `${BASE_URL}${KEY}&q=${search}&image_type=all&orientation=horizontal&safesearch=true&page=${page}&per_page=40`

	try {
		const responce = await axios(url);
		return responce.data;
	} catch (e) {
		console.log(e);
	}
}