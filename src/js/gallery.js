import "tui-pagination/dist/tui-pagination.css";
import Pagination from "tui-pagination";
import {UnsplashAPI} from "./UnsplashAPI.js";
import {render} from "./render.js";
import iziToast from "izitoast";
import "iziToast/dist/css/iziToast.min.css";

const api = new UnsplashAPI();

const container = document.getElementById("tui-pagination-container");

const searcher = document.querySelector(".js-search-form");
searcher.addEventListener("submit", async (event) => {
	event.preventDefault();

	const inputEvent = event.target.elements.query.value.trim();
	if (inputEvent === "") {
		iziToast.warning({
			message: "Enter something for search!",
		});
		return;
	}
	api.query = inputEvent;
	try {
		const data = await api.getPopularPhotos(page);
		if (data.results.length === 0) {
			iziToast.error({
				title: "Oops", message: "Images not found",
			});
			return;
		}
		render(data.results);
		pagination.reset(data.total);
	} catch (e) {
		console.log(e);
		iziToast.error({
			title: "Oops", message: "Something went wrong!",
		});
	}
});

const pagination = new Pagination(container, {
	totalItems: 0, itemsPerPage: 12, visiblePages: 5, page: 1,
});

const page = pagination.getCurrentPage();

api
	.getPopularPhotos(page)
	.then(({results, total}) => {
		render(results);
		pagination.reset(total);
	})
	.catch((e) => console.log(e));

pagination.on("afterMove", paginPopular);

function paginPopular(event) {
	const currentPage = event.page;
	api.getPopularPhotos(currentPage).then(({results}) => {
		render(results);
	});
}
