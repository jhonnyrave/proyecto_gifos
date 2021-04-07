const $carousel = document.querySelector(".carousel");
const $flecha_izquierda = document.querySelector("#flecha-izquierda");
const $flecha_derecha = document.querySelector("#flecha-derecha");

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
    div.classList.add("slick");
    div.innerHTML = ` 
    <img class="gif-trending" onclick="maximizeGif('${trendingGif.data[i].images.original.url}','${trendingGif.data[i].username}','${trendingGif.data[i].title}')" src="${trendingGif.data[i].images.original.url}" alt="${trendingGif.data[i].title}">

    <div class="text-container">
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
