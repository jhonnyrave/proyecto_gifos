document.addEventListener("DOMContentLoaded", function () {
  function dataTrending() {
    let apiKey = "rIEVvs2KtgBiLhRpXdBjTQ05itZuxWd8";
    let giphyAPI = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`;
    getData(giphyAPI);
    carrusel();
  }

  function getData(urlAPI) {
    fetch(urlAPI)
      .then((response) => response.json())
      .then((json) => {
        json.data
          .map((gif) => gif.images.fixed_width.url)
          .forEach((url) => {
            let div = document.createElement("div");
            div.className = "slick";
            let img = document.createElement("img");
            img.src = url;
            img.className = "gif-trending";
            div.appendChild(img);
            let el = document.querySelector(".carousel");
            el.appendChild(div);
          });
      })
      .catch((error) => console.log(err));
  }

  dataTrending();
});

function carrusel() {
  const fila = document.querySelector(".contenedor-carousel");
  const gifos = document.querySelectorAll(".slick");

  const flechaIzquierda = document.getElementById("flecha-izquierda");
  const flechaDerecha = document.getElementById("flecha-derecha");

  // ? ----- ----- Event Listener para la flecha derecha. ----- -----
  if (flechaDerecha) {
    flechaDerecha.addEventListener("click", () => {
      fila.scrollLeft += fila.offsetWidth;
    });
  }

  // ? ----- ----- Event Listener para la flecha izquierda. ----- -----
  if (flechaIzquierda) {
    flechaIzquierda.addEventListener("click", () => {
      fila.scrollLeft -= fila.offsetWidth;
    });
  }
}
