const $favoritosMenu = document.querySelector("#FavoritosMenu");
const $heroSection = document.querySelector("#heroSection");
const $misGifosSection = document.querySelector("#misGifosSection");
const $createGifSection = document.querySelector("#createGifSection");
const $favSection = document.querySelector("#favorites-section");
const $favContainer = document.querySelector("#fav-container");
const $noFavsContainer = document.querySelector("#noFavs_container");
const $trendingSection = document.querySelector("#trendingSection");

//adicionar favoritos
let array_favoritos = [];

const gitFavoritos = (gif, title, username) => {
  let objGif = {
    username: username,
    title: title,
    gif: gif,
  };

  var icon = document.getElementById(gif);
  icon.classList.toggle("favorite");
  icon.classList.toggle("favoriteActive");
  let existe = 0;
  array_favoritos = JSON.parse(localStorage.getItem("FavoriteGifs")) || [];
  if (array_favoritos) {
    for (let index = 0; index < array_favoritos.length; index++) {
      const element = array_favoritos[index];
      if (element.gif == objGif.gif) {
        existe = 1;
      }
    }
  }

  if (existe == 0) {
    if (array_favoritos == null) {
      localStorage.setItem("FavoriteGifs", JSON.stringify(array_favoritos));
    } else {
      array_favoritos.push(objGif);
      localStorage.setItem("FavoriteGifs", JSON.stringify(array_favoritos));
    }
  }
  displayFavoriteGifs();
};

const displayFavoriteGifs = () => {
  $favContainer.innerHTML = "";
  array_favoritos = JSON.parse(localStorage.getItem("FavoriteGifs"));
  if (array_favoritos == null) {
    array_favoritos = [];
  } else {
    for (let i = 0; i < array_favoritos.length; i++) {
      const gifContainer = document.createElement("div");
      gifContainer.classList.add("gif__container");
      console.log(array_favoritos[i]);
      gifContainer.innerHTML = ` 
        <img class="gif" onclick="maximizeFavoriteGif('${array_favoritos[i].gif}','${array_favoritos[i].username}','${array_favoritos[i].title}')" src="${array_favoritos[i].gif}" alt="${array_favoritos[i].title}">
        <div class="gifActions">
            <div class="btn-gitActions">
                <div class="btn favorite" onclick="gitFavoritos('${array_favoritos[i].gif}','${array_favoritos[i].username}','${array_favoritos[i].title}')"></div>
                <div class="btn download" onclick="downloadGif('${array_favoritos[i].gif}','${array_favoritos[i].title}')"></div>
                <div class="btn maximize" onclick="maximizeFavoriteGif('${array_favoritos[i].gif}','${array_favoritos[i].username}','${array_favoritos[i].title}')"></div>
            </div>
            <div class="gif__info">
                <p class="gif_user">${array_favoritos[i].username}</p>
                <p class="gif_title">${array_favoritos[i].title}</p>
            </div>
        </div>
        `;
      $favContainer.appendChild(gifContainer);
    }
  }
};

const displayFavoriteSection = (event) => {
  event.preventDefault();
  $heroSection.classList.add("hidden");
  $misGifosSection.classList.add("hidden");
  $createGifSection.classList.add("hidden");
  $trendingSection.classList.add("hidden");
  $favSection.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  displayFavoriteGifs();

  if (array_favoritos == 0 || array_favoritos == null) {
    $noFavsContainer.classList.remove("hidden");
    $favContainer.classList.add("hidden");
  } else {
    $noFavsContainer.classList.add("hidden");
    $favContainer.classList.remove("hidden");
  }
};

$favoritosMenu.addEventListener("click", displayFavoriteSection);
