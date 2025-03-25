import {UnsplashAPI} from "./UnsplashAPI.js";
import {render} from "./render.js";

const api = new UnsplashAPI();

api
	.getPopularPhotos(1)
	.then(({results}) => {
		render(results)
	})
	.catch((e) => console.log(e));
