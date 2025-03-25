import axios from "axios";
import iziToast from "izitoast";

export class UnsplashAPI {
	#BASE_URL = "https://api.unsplash.com/search/photos";
	#API_KEY = import.meta.env.VITE_API_KEY;
	#query = "";

	async getPopularPhotos(page) {
		const url = `${this.#BASE_URL}?client_id=${this.#API_KEY}&query=popular&page=${page}&per_page=12&orientation=portrait`;

		try {
			const {data} = await axios(url);
			return data;
		} catch (e) {
			console.log(e);
		}
	}

	set query(newQuery) {
		this.#query = newQuery;
	}

	async searchQuery(page) {
		const url = `${this.#BASE_URL}?client_id=${this.#API_KEY}&query=${this.#query}&page=${page}&per_page=12&orientation=portrait`;

		try {
			const {data} = await axios(url);
			return data;
		} catch (e) {
			console.log(e);
		}
	}
}
