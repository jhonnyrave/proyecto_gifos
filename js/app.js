document.addEventListener("DOMContentLoaded", function () {
  function dataTrending() {
    let apiKey = "rIEVvs2KtgBiLhRpXdBjTQ05itZuxWd8";
    let giphyAPI = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`;
    getData(giphyAPI);
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
            let el = document.querySelector(".slick-track");
            el.appendChild(div);
          });
      })
      .catch((error) => console.log(err));
  }

  dataTrending();
});

function App() {}

window.onload = function (event) {
  var app = new App();
  window.app = app;
};

App.prototype.processingButton = function (event) {
  const btn = event.currentTarget;
  const slickList = event.currentTarget.parentNode;
  const track = event.currentTarget.parentNode.querySelector("#track");
  const slick = track.querySelectorAll(".slick");
  const slickWidth = slick[0].offsetWidth;
  const trackWidth = track.offsetWidth;
  const listWidth = slickList.offsetWidth;

  track.style.left == ""
    ? (leftPosition = track.style.left = 0)
    : (leftPosition = parseFloat(track.style.left.slice(0, -2) * -1));

  btn.dataset.button == "button-prev"
    ? prevAction(leftPosition, slickWidth, track)
    : nextAction(leftPosition, trackWidth, listWidth, slickWidth, track);
};

let prevAction = (leftPosition, slickWidth, track) => {
  if (leftPosition > 0) {
    console.log("entro 2");
    track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
  }
};

let nextAction = (leftPosition, trackWidth, listWidth, slickWidth, track) => {
  if (leftPosition < trackWidth - listWidth) {
    track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
  }
};
