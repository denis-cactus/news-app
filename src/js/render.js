const gallery = document.querySelector(".gallery");

export function render(photos) {
	const markup = photos
		.map(({alt_description, urls: {small}}) => `
		  <li class="gallery-item">
            <img class="gallery-img" src="${small}" alt="${alt_description}" />
          </li>
		`)
		.join("");
	gallery.innerHTML = markup;
}
