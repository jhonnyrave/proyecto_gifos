const $divParent = document.getElementById("search__container");
const $input_search = document.getElementById("searchInput");
const $inputContainer = document.getElementById("input__container");
const $imgClose = document.getElementById("search-close-icon");
const $searchIcon = document.querySelector(".search-icon");
const $containerSearch = document.getElementById("searchResult");
const $divSearchGif = document.getElementById("searchResult_gallery");
const $titleSearchGif = document.getElementById("searchResult__title");
const $items = 12;

$input_search.addEventListener("keyup", () => {
  const $valueSearch = $input_search.value;
  apiSearchGifs($valueSearch);
});

$imgClose.addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  closeResults();
});

let requestOptions = {
  method: "GET",
  redirect: "follow",
};

const apiSearchGifs = ($valueSearch) => {
  fetch(
    `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${$valueSearch}&limit=4`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      searchBarGifs(result);
    })
    .catch((error) => console.log("error", error));
};

function cleanSearchBar() {
  const $listResult = document.getElementById("list__result");
  if ($listResult) {
    $listResult.classList.remove(".list__result");
    $listResult.remove();
  }

  const $searchResult = document.getElementById("search__results");
  if ($searchResult) {
    $searchResult.innerHTML = "";
    $searchResult.remove();
  }

  const $inputValue = document.getElementById("searchInput").value;
  if ($inputValue == "") {
    $inputContainer.style.flexDirection = "row";
    $inputContainer.style.alignItems = "center";
    $inputContainer.style.justifyContent = "space-around";
    $imgClose.classList.add("hidden");
    $searchResult.remove();
    $listResult.remove();
  } else {
    showResults();
  }
}

function closeResults() {
  $inputContainer.style.flexDirection = "row";
  $inputContainer.style.alignItems = "center";
  $inputContainer.style.justifyContent = "space-around";
  $imgClose.classList.add("hidden");
  if (document.getElementById("search__results")) {
    document.getElementById("search__results").innerHTML = "";
    document.getElementById("search__results").remove();
  }
}

function showResults() {
  $inputContainer.style.flexDirection = "row-reverse";
  $inputContainer.style.alignItems = "center";
  $inputContainer.style.justifyContent = "space-around";
  $imgClose.classList.remove("hidden");
}

const searchBarGifs = (result) => {
  cleanSearchBar();
  const $divResults = document.createElement("div");
  $divResults.setAttribute("id", "search__results");
  if (result.data.length == 0) {
    $divSearchGif.innerHTML = "";
    $containerSearch.classList.remove("hidden");
    $titleSearchGif.innerHTML = "Lorem ipsum";
    const $imgNotFound = document.createElement("img");
    $imgNotFound.setAttribute("class", "not_found_icon");
    $imgNotFound.setAttribute("src", "assets/icon-busqueda-sin-resultado.svg");
    $imgNotFound.style.marginBottom = "30px";
    $divSearchGif.appendChild($imgNotFound);
    const $paragNotFound = document.createElement("p");
    $paragNotFound.setAttribute("class", "not_found_text");
    $paragNotFound.innerHTML = "Intenta con otra búsqueda.";
    $divSearchGif.appendChild($paragNotFound);
    $divSearchGif.style.flexDirection = "column";
    $divSearchGif.style.justifyContent = "center";
  } else {
    const $ul = document.createElement("ul");
    $ul.setAttribute("id", "list__result");
    $ul.setAttribute("class", "list__result");
    $ul.style.borderTop = "1px solid #9CAFC3";
    $ul.style.marginTop = "10px";
    $divResults.appendChild($ul);
    for (let i = 0; i < result.data.length; i++) {
      // console.log(result.data[i].name);
      const $li = document.createElement("li");
      $li.setAttribute("class", "list__result__item");
      $li.setAttribute("id", `item-list-${[i]}`);
      $li.setAttribute("onclick", `captureVal(\'' + ${[i]} +'\')`);
      $li.style.marginTop = "10px";
      $li.innerHTML = `<img class="search__icon_peq" src="assets/icon-search.svg" alt="">
      <a href="#searchResult" class="list__result__link">${result.data[i].name}</a>`;
      $ul.appendChild($li);
    }
    $divParent.appendChild($divResults);
  }
};

function captureVal(i) {
  const $list_item = `item-list-${i}`;
  const $value_list = document.getElementById($list_item).innerText;
  // console.log($value_list);
  $input_search.value = $value_list;
  $titleSearchGif.innerHTML = $value_list;
  apiSearchVal($value_list);
  document.getElementById("searchInput").value = "";
  closeResults();
}

function captureValResult(i) {
  const $result_item = `results__tags__${i}`;
  const $value_result = document.getElementById($result_item).innerText;
  const $value_clear = $value_result.split(",")[0];
  console.log($value_clear);
  $input_search.value = $value_clear;
  $titleSearchGif.innerHTML = $value_clear;
  apiSearchVal($value_clear);
  document.getElementById("searchInput").value = "";
  closeResults();
}

const apiSearchVal = ($value_list, $offset = 0) => {
  let $totOffset = $offset * 12;
  fetch(
    `${searchGiphy}?api_key=${apiKey}&q=${$value_list}&limit=12&offset=${$totOffset}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      // console.log(result);
      resultGif(result);
      buildPagination($value_list, $items, $offset);
    })
    .catch((error) => console.log("error", error));
};

function buildPagination(value, itemsPerPage, currentOffset) {
  const $numberOfItems = 60;
  const $ulPag = document.querySelector("#pagination");
  $ulPag.innerHTML = "";
  $ulPag.classList.remove("hidden");
  $ulPag.style.marginBottom = "20px";
  $ulPag.style.marginTop = "39px";
  let page = Math.ceil($numberOfItems / itemsPerPage);
  console.log(itemsPerPage);
  for (let pg = 1; pg <= page; pg++) {
    $ulPag.innerHTML += `<li class="list-pg num-pg-${pg}">${pg}</li>`;
    $list_val = document.querySelector(`.num-pg-${pg}`);
    if (pg == currentOffset + 1) {
      $list_val.style.backgroundColor = "#572EE5";
      $list_val.style.color = "#FFFFFF";
      $list_val.style.width = "32px";
      $list_val.style.height = "32px";
      $list_val.style.borderRadius = "50px";
    }
    if ($list_val) {
      $list_val.setAttribute("onclick", `apiSearchVal('${value}', ${pg - 1})`);
    }
  }
}

const resultGif = (result) => {
  $resultGallery = document.getElementById("searchResult_gallery");
  $resultGallery.innerText = "";
  $containerSearch.classList.remove("hidden");
  for (let i = 0; i < result.data.length; i++) {
    const $divContentResult = document.createElement("div");
    $divContentResult.classList.add("gif__container__results");
    $divContentResult.innerHTML = `
    <img class="gif-image" onclick="maximizeGif('${result.data[i].images.original.url}','${result.data[i].username}','${result.data[i].title}')" src="${result.data[i].images.original.url}" alt="${result.data[i].title}">
    <div class="gifActions">
        <div class="btn-gitActions">
            <div class="btn favorite" id ="${result.data[i].images.original.url}" onclick="gitFavoritos('${result.data[i].images.original.url}','${result.data[i].username}','${result.data[i].title}')"></div>
            <div class="btn favorite" onclick="gitFavoritos('${result.data[i].images.original.url}','${result.data[i].username}','${result.data[i].title}')"></div>
            <div class="btn download" onclick="downloadGif('${result.data[i].images.original.url}','${result.data[i].title}')"></div>
            <div class="btn maximize" onclick="maximizeGif('${result.data[i].images.original.url}','${result.data[i].username}','${result.data[i].title}')"></div>
        </div>
    </div>
    `;
    $divSearchGif.appendChild($divContentResult);
    $divSearchGif.style.flexDirection = "row";
    $divSearchGif.style.justifyContent = "space-evenly";
  }

  // const $divGifResults = document.createElement("div");
  // $divGifResults.setAttribute("id", "grid_results");
  // $divGifResults.appendChild($divSearchGif);
};
