document.addEventListener("DOMContentLoaded", function () {
  function dataTrending() {
    let giphy = `${giphyAPI}?api_key=${apiKey}`;
    getData(giphy);
    carrusel();
  }

  function getData(urlAPI) {
    fetch(urlAPI)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data);
        json.data
          .map((gif) => gif)
          .forEach((gif) => {
            -----
            let div = document.createElement("div");
            div.className = "slick";
            let img = document.createElement("img");
            img.src = gif.images.fixed_width.url;
            img.className = "gif-trending";
            img.id = "myImg";
            img.onmouseover = "modal(this)";
            div.appendChild(img);

            let divcontainer = document.createElement("div");
            divcontainer.className = "text-container";
            div.appendChild(divcontainer);

            let divCorazon = document.createElement("div");
            divCorazon.className = "img-carrusel corazon";
            divCorazon.id = "img-corazon";
            divcontainer.appendChild(divCorazon);

            let user = document.createElement("p");
            user.appendChild(document.createTextNode(gif.user.username));
            user.className = "user-gif";
            divcontainer.appendChild(user);

            let title = document.createElement("h4");
            title.appendChild(document.createTextNode(gif.title));
            title.className = "title-gif";
            divcontainer.appendChild(title);

            let parrafo = document.createElement("p");
            parrafo.title = "TEXTO PRUEBA";
            divcontainer.appendChild(parrafo);

            let el = document.querySelector(".carousel");
            el.appendChild(div);
          });
      })
      .catch((error) => console.log(error));
  }

  dataTrending();
});

function carrusel() {
  const fila = document.querySelector(".contenedor-carousel");
  const flechaIzquierda = document.getElementById("flecha-izquierda");
  const flechaDerecha = document.getElementById("flecha-derecha");

  // ? ----- ----- Event Listener para la flecha derecha. ----- -----
  if (flechaDerecha) {
    flechaDerecha.addEventListener("click", () => {
      fila.scrollLeft += fila.offsetWidth;
    });

    flechaDerecha.addEventListener("mouseover", () => {
      flechaDerecha.src = "assets/Button-Slider-right-hover.svg";
      flechaDerecha.appendChild(flechaDerecha);
    });
    //flechaDerecha.addEventListener("mouseout", setBtnCarrusel);
  }

  // ? ----- ----- Event Listener para la flecha izquierda. ----- -----
  if (flechaIzquierda) {
    flechaIzquierda.addEventListener("click", () => {
      fila.scrollLeft -= fila.offsetWidth;
    });
    flechaIzquierda.addEventListener("mouseover", () => {
      flechaIzquierda.src = "assets/button-slider-left-hover.svg";
    });
    //flechaIzquierda.addEventListener("mouseout", setBtnCarrusel);
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

function modal() {
  var modal = document.getElementById("myModal");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var img = document.getElementById("myImg");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
  img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  };

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };
}

const setBtnCarrusel = () => {
  if (localStorage.getItem("dark-mode") === "true") {
    flechaDerecha.src = "assets/button-slider-left-md-noct.svg";
    flechaIzquierda.src = "assets/button-slider-right-md-noct.svg";
  } else {
    flechaDerecha.src = "assets/button-slider-left.svg";
    flechaIzquierda.src = "assets/Button-Slider-right.svg";
  }
};
