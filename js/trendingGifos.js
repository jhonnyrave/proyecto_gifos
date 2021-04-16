const $carousel = document.querySelector("#trending__slider");
const $flecha_izquierda = document.querySelector("#previous-btn");
const $flecha_derecha = document.querySelector("#next-btn");
const $gitMaximized = document.querySelector("#maximizedGif");
const $maxCloseBtn = document.querySelector("#close-max-btn");
const $flecha_izquierda_modal = document.querySelector("#previous-btn-modal");
const $flecha_derecha_modal = document.querySelector("#next-btn-modal");

$flecha_izquierda.addEventListener("mouseout", () => {
  $flecha_izquierda.src = "assets/button-slider-left.svg";
});

$flecha_derecha.addEventListener("mouseout", () => {
  $flecha_derecha.src = "assets/Button-Slider-right.svg";
});

$flecha_izquierda.addEventListener("mouseover", () => {
  $flecha_izquierda.src = "assets/button-slider-left-hover.svg";
});

$flecha_derecha.addEventListener("mouseover", () => {
  $flecha_derecha.src = "assets/Button-Slider-right-hover.svg";
});

const apiTrendingGifs = async () => {
  await fetch(`${giphyAPI}?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((trendingGif) => {
      console.log(trendingGif);
      carouselTrendingGifs(trendingGif);
    })
    .catch((err) => console.log(err));
};

apiTrendingGifs();

const carouselTrendingGifs = (trendingGif) => {
  for (let i = 0; i < trendingGif.data.length; i++) {
    const div = document.createElement("div");
    div.classList.add("gif__container");
    div.innerHTML = ` 
    <img class="gif" onclick="maximizeGif('${trendingGif.data[i].images.original.url}','${trendingGif.data[i].username}','${trendingGif.data[i].title}')" src="${trendingGif.data[i].images.original.url}" alt="${trendingGif.data[i].title}">

    <div class="gifActions">
        <div class="btn-gitActions">
            <div class="btn favorite" onclick="addToFav('${trendingGif.data[i].images.original.url}','${trendingGif.data[i].username}','${trendingGif.data[i].title}')"></div>
            <div class="btn download" onclick="downloadGif('${trendingGif.data[i].images.original.url}','${trendingGif.data[i].title}')"></div>
            <div class="btn maximize" onclick="maximizeGif('${trendingGif.data[i].images.original.url}','${trendingGif.data[i].username}','${trendingGif.data[i].title}')"></div>
        </div>
        <div class="gif__info">
            <p class="gif_user">${trendingGif.data[i].username}</p>
            <p class="gif_title">${trendingGif.data[i].title}</p>
        </div>
    </div>
    `;
    $carousel.appendChild(div);
  }
};

const nextSliderBtn = () => {
  $carousel.scrollLeft -= 400;
};

const prevSliderBtn = () => {
  $carousel.scrollLeft += 400;
};

$flecha_izquierda.addEventListener("click", nextSliderBtn);
$flecha_derecha.addEventListener("click", prevSliderBtn);

//maximizar gifo
const maximizeGif = (gif, username, title) => {
  $gitMaximized.classList.remove("hidden");
  $gitMaximized.classList.add("maximizedGif");
  $gitMaximized.innerHTML = "";
  const maximizedGifContainer = document.createElement("div");
  maximizedGifContainer.classList.add("maximizedGif__container");
  maximizedGifContainer.innerHTML = `
  <div class="close-btn" id="close-max-btn" onclick="closeMaximized()"></div>
	<div class="maxGif_Container">
  <div class="previous-btn-modal arrows">
  <img src="assets/button-slider-left.svg" 
  alt="Flecha Previous" id="previous-btn-modal">
</div>
		<img class="gifMax" src="${gif}" alt="${title}">
    <div class="next-btn-modal arrows">
				<img src="assets/Button-Slider-right.svg" alt="Flecha Next" id="next-btn-modal">
			</div>
	</div>
	<div class="gifMaxActions">
		<div class="gif__info">
			<p class="gif_user">${username}</p>
			<p class="gif_title">${title}</p>
		</div>
		<div class="btn-gifMaxActions">
			<div class="buttonsMax favoriteMax" onclick="addToFav('${gif}', '${username}', '${title}')"></div>
			<div class="buttonsMax downloadMax" onclick="downloadGif('${gif}','${title}')"></div>
			</div>
	</div>`;
  $gitMaximized.appendChild(maximizedGifContainer);
};

//cerrar modal
const closeMaximized = () => {
  $gitMaximized.classList.add("hidden");
  $gitMaximized.classList.remove("maximizedGif");
};
