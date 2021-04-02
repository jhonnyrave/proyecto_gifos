document.addEventListener("DOMContentLoaded", function () {
  function dataTrending() {
    let apiKey = "rIEVvs2KtgBiLhRpXdBjTQ05itZuxWd8";
    let giphyAPI = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`;
    getData(giphyAPI);
    carrusel();
    nocturna();
  }

  function getData(urlAPI) {
    fetch(urlAPI)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data);
        json.data
          .map((gif) => gif)
          .forEach((gif) => {
            console.log(gif.title);
            let div = document.createElement("div");
            div.className = "slick";
            let img = document.createElement("img");
            img.src = gif.images.fixed_width.url;
            img.className = "gif-trending";
            div.appendChild(img);
            let divcontainer = document.createElement("div");
            divcontainer.className = "text-container";
            div.appendChild(divcontainer);
            let h4 = document.createElement("h4");
            h4.appendChild(document.createTextNode(gif.title));
            divcontainer.appendChild(h4);
            let parrafo = document.createElement("p");
            parrafo.title = "TEXTO PRUEBA";
            divcontainer.appendChild(parrafo);
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

function nocturna() {
  const nocturno = document.querySelector("#modo-nocturno");
  nocturno.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.footer.classList.toggle("dark");
    nocturno.classList.toggle("active");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("dark-mode", "true");
    } else {
      localStorage.setItem("dark-mode", "false");
    }
  });

  if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

function getStreamAndRecord() {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 480 },
      },
    })
    .then(function (stream) {
      video.srcObject = stream;
      video.play();
    });
}
