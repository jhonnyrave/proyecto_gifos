const $carousel = document.querySelector("#trending__slider");
const $flecha_izquierda = document.querySelector("#previous-btn");
const $flecha_derecha = document.querySelector("#next-btn");
const $gitMaximized = document.querySelector("#maximizedGif");
const $maxCloseBtn = document.querySelector("#close-max-btn");
const $carousel_modal = document.querySelector("#trending__slider-modal");
const $flecha_izquierda_modal = document.querySelector("#previous-btn-modal");
const $flecha_derecha_modal = document.querySelector("#next-btn-modal");
const carrusel_img = document.getElementsByClassName("gif__container_modal");
const $maxGif_Container = document.querySelector("#maxGif_Container");

$flecha_izquierda.addEventListener("mouseout", () => {
  $flecha_izquierda.src = "assets/button-slider-left.svg";
});

$flecha_izquierda_modal.addEventListener("mouseout", () => {
  $flecha_izquierda_modal.src = "assets/button-slider-left.svg";
});

$flecha_derecha.addEventListener("mouseout", () => {
  $flecha_derecha.src = "assets/Button-Slider-right.svg";
});

$flecha_derecha_modal.addEventListener("mouseout", () => {
  $flecha_derecha_modal.src = "assets/Button-Slider-right.svg";
});

$flecha_izquierda.addEventListener("mouseover", () => {
  $flecha_izquierda.src = "assets/button-slider-left-hover.svg";
});

$flecha_izquierda_modal.addEventListener("mouseover", () => {
  $flecha_izquierda_modal.src = "assets/button-slider-left-hover.svg";
});

$flecha_derecha.addEventListener("mouseover", () => {
  $flecha_derecha.src = "assets/Button-Slider-right-hover.svg";
});

$flecha_derecha_modal.addEventListener("mouseover", () => {
  $flecha_derecha_modal.src = "assets/Button-Slider-right-hover.svg";
});

const apiTrendingGifs = async () => {
  await fetch(`${giphyAPI}?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((trendingGif) => {
      localStorage.clear();
      let gifos = [];
      gifos.push(trendingGif);
      console.log(trendingGif);
      localStorage.setItem("GifosArray", JSON.stringify(gifos));
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
    <img class="gif" onclick="maximizeGif('${trendingGif.data[i].images.original.url}')" src="${trendingGif.data[i].images.original.url}" alt="${trendingGif.data[i].title}">

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

// Flechas modal
const nextSliderBtn_modal = () => {
  console.log(carrusel_img);
  for (let index = 0; index < carrusel_img.length; index++) {
    if (carrusel_img[index].style.display == "flex") {
      let conteo = index - 1;
      if (conteo < 0) {
        conteo = 49;
      }
      carrusel_img[index].style.display = "none";
      carrusel_img[conteo].style.display = "flex";
    }
  }
};

const prevSliderBtn_modal = () => {
  console.log(carrusel_img);
  for (let index = 0; index < carrusel_img.length; index++) {
    if (carrusel_img[index].style.display == "flex") {
      carrusel_img[index].style.display = "none";
      index = index + 1;
      if (index == 49) {
        index = 0;
      }
      carrusel_img[index].style.display = "flex";
    }
  }
};

$flecha_izquierda.addEventListener("click", nextSliderBtn);
$flecha_derecha.addEventListener("click", prevSliderBtn);

$flecha_derecha_modal.addEventListener("click", prevSliderBtn_modal);
$flecha_izquierda_modal.addEventListener("click", nextSliderBtn_modal);
//maximizar gifo
const maximizeGif = (gif) => {
  let retrievedObject = JSON.parse(localStorage.getItem("GifosArray"));
  $gitMaximized.classList.remove("hidden");
  $gitMaximized.classList.add("maximizedGif");
  $carousel_modal.innerHTML = "";
  for (let i = 0; i < retrievedObject[0].data.length; i++) {
    const div = document.createElement("div");
    div.classList.add("gif__container_modal");
    if (gif == retrievedObject[0].data[i].images.original.url) {
      const inicio = i;
      div.innerHTML = ` 
  <img class="gifMax" src="${retrievedObject[0].data[inicio].images.original.url}" alt="${retrievedObject[0].data[i].images.original.title}">
  <div class="gifMaxActions">
        <div class="gifMaxActions__btn">
            <div class="buttonsMax favoriteMax " onclick="addToFav()"></div>
            <div class="buttonsMax downloadMax" onclick="downloadGif()"></div>
        </div>
        <div class="gif-info-modal">
            <p class="gif_user-modal">data</p>
            <p class="gif_title-modal">titulo</p>
        </div>
    </div>
  `;
      $carousel_modal.appendChild(div);
      div.style.display = "flex";
    } else {
      div.innerHTML = ` 
      <img class="gifMax" src="${retrievedObject[0].data[i].images.original.url}" alt="${retrievedObject[0].data[i].images.original.title}">
      `;
      $carousel_modal.appendChild(div);
      div.style.display = "none";
    }
  }
};

//cerrar modal
const closeMaximized = () => {
  $gitMaximized.classList.add("hidden");
  $gitMaximized.classList.remove("maximizedGif");
};
