const $favoritosMenu = document.querySelector("#FavoritosMenu");
const $heroSection = document.querySelector("#heroSection");
const $misGifosSection = document.querySelector("#misGifosSection");
const $createGifSection = document.querySelector("#createGifSection");
const $favSection = document.querySelector("#favorites-section");
const $favContainer = document.querySelector("#fav-container");
const $noFavsContainer = document.querySelector("#noFavs_container");

//adicionar favoritos
let array_favoritos = [];

const gitFavoritos = (gif, title, username) => {
  let objGif = {
    username: username,
    title: title,
    gif: gif,
  };

  array_favoritos.push(objGif);
  localStorage.setItem("FavoriteGifs", JSON.stringify(array_favoritos));
};

const displayFavoriteGifs = () => {
  $favContainer.innerHTML = "";

  arrFavoriteGifs = JSON.parse(localStorage.getItem("FavoriteGifs"));

  if (arrFavoriteGifs == null) {
    arrFavoriteGifs = [];
  } else {
    for (let i = 0; i < arrFavoriteGifs.length; i++) {
      const gifContainer = document.createElement("div");
      gifContainer.classList.add("gif__container");
      gifContainer.innerHTML = ` 
                <img class="gif" onclick="maximizeFavoriteGif('${arrFavoriteGifs[i].gif}','${arrFavoriteGifs[i].username}','${arrFavoriteGifs[i].title}')" src="${arrFavoriteGifs[i].gif}" alt="${arrFavoriteGifs[i].title}">
            
                <div class="gifActions">
                    <div class="gifActions__btn">
                        <div class="btn remove" onclick="removeGif('${arrFavoriteGifs[i].gif}')"></div>
                        <div class="btn download" onclick="downloadGif('${arrFavoriteGifs[i].gif}','${arrFavoriteGifs[i].title}')"></div>
                        <div class="btn maximize" onclick="maximizeFavoriteGif('${arrFavoriteGifs[i].gif}','${arrFavoriteGifs[i].username}','${arrFavoriteGifs[i].title}')"></div>
                    </div>
                    <div class="gif__info">
                        <p class="gif_user">${arrFavoriteGifs[i].username}</p>
                        <p class="gif_title">${arrFavoriteGifs[i].title}</p>
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
  $favSection.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  displayFavoriteGifs();

  if (arrFavoriteGifs == 0 || arrFavoriteGifs == null) {
    $noFavsContainer.classList.remove("hidden");
    $favContainer.classList.add("hidden");
  } else {
    $noFavsContainer.classList.add("hidden");
    $favContainer.classList.remove("hidden");
  }
};

$favoritosMenu.addEventListener("click", displayFavoriteSection);
