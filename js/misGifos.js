const $misGifosMenu = document.querySelector("#misGifosMenu");
const $misGifosSection = document.querySelector("#misGifosSection");
const $createGifSection = document.querySelector("#createGifSection");

$misGifosMenu.addEventListener("click", displayMisGifosSection);

const displayMisGifosSection = (event) => {
  event.preventDefault();
  $misGifosSection.classList.remove("hidden");
  $heroSection.classList.add("hidden");
  $favSection.classList.add("hidden");
  $createGifSection.classList.add("hidden");
  $trendingSection.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  displayMiGifos();

  if (arrMyGifos == 0 || arrMyGifos == null) {
    $noGifContainer.classList.remove("hidden");
    $misGifosContainer.classList.add("hidden");
  } else {
    $noGifContainer.classList.add("hidden");
    $misGifosContainer.classList.remove("hidden");
  }
};
