// ---- Eliminar en favoritos ---- \\

const removeGif = (gif) => {
  let arrFavoriteParsed = JSON.parse(localStorage.getItem("FavoriteGifs"));
  console.log(arrFavoriteParsed);
  for (let i = 0; i < arrFavoriteParsed.length; i++) {
    if (arrFavoriteParsed[i].gif === gif) {
      arrFavoriteParsed.splice(i, 1);
      localStorage.setItem("FavoriteGifs", JSON.stringify(arrFavoriteParsed));
      displayFavoriteSection(event);
      closeMaximized();
    }
  }
};
