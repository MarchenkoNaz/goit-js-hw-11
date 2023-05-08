import axios from 'axios';
const BASE_URL = `https://pixabay.com/api/`;
const KEY = `36018585-20849131c04f34b8cc636ef66`;
const searchParams = new URLSearchParams({
	key: KEY,
	image_type: 'photo',
	orientation: 'horizontal',
	safesearch: true,
	per_page: 40,
});
export async function fetchPhotos(search, page = 1) {

	const url = `${BASE_URL}?${searchParams}&q=${search}&page=${page}`;
	try {
		const responce = await axios(url);
		return responce.data;
	} catch (e) {
		console.log(e);
	}
}