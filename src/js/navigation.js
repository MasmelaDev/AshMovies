const exploreButtons = document.querySelector(".main__optionsButtons");

exploreButtons.addEventListener("click", (entry) => {
  if (entry.target.nodeName === "LI") {
    const tab = entry.target;
    location.hash = tab.classList[1];
  }
});

const genresContainer = document.querySelector(".genres__carousel");

genresContainer.addEventListener("click", (entry) => {
  if (entry.target.nodeName === "ARTICLE" ) {
    const genre = entry.target;
    location.hash = `genre=${genre.id.slice(2)}=${genre.innerText}`;  }
  if (entry.target.nodeName === "H2" ) {
      const genre = entry.target.parentNode;
      location.hash = `genre=${genre.id.slice(2)}=${genre.innerText}`;  }
});

window.addEventListener("hashchange", navigator, false);
window.addEventListener("load", navigator, false);

function navigator() {
  if (location.hash.startsWith("#genres")) {
    changeSection(".genres");
  } else if (location.hash.startsWith("#popular")) {
    changeSection(".popular");
  } else if (location.hash.startsWith("#new")) {
    changeSection(".new");
  } else if (location.hash.startsWith("#genre=")) {
    showGenre();
  } else if (location.hash.startsWith("#back")) {
    backToGenres()
  } else {
  }
}


function showGenre() {
  const genres__container = document.querySelector(".genres__container");
  genres__container.classList.remove("active");

  const genres__moviesContainer = document.createElement("div");
  genres__moviesContainer.classList.add("genres__moviesContainer");


  const genre = location.hash.split("=")

  const genres__moviesContainerTitle = document.createElement("h2");
  genres__moviesContainerTitle.className = "genres__moviesContainerTitle";
  genres__moviesContainerTitle.textContent = genre[2]
  genres__moviesContainerTitle.addEventListener("click", (entry) => {
    location.hash = "back";
  });

  const leftRowContainerGenreMovies = document.createElement("button");
  leftRowContainerGenreMovies.className = "leftRowContainerGenreMovies";
  const leftRow = document.createElement("img");
  leftRowContainerGenreMovies.appendChild(leftRow);
  leftRow.className = "leftRow";
  leftRow.alt = "leftRow";
  leftRow.src = "./src/assets/angle-left-solid.svg";

  const genres__moviesCarousel = document.createElement("div");
  genres__moviesCarousel.className = "genres__moviesCarousel";

  const rightRowContainerGenreMovies = document.createElement("button");
  rightRowContainerGenreMovies.className = "rightRowContainerGenreMovies";
  const rightRow = document.createElement("img");
  rightRowContainerGenreMovies.appendChild(rightRow);
  rightRow.className = "rightRow";
  rightRow.alt = "rightRow";
  rightRow.src = "./src/assets/angle-right-solid.svg";

  const genres__moviesCarouselContainer = document.createElement("div");
  genres__moviesCarouselContainer.className = "genres__moviesCarouselContainer";
  genres__moviesCarouselContainer.append(
    leftRowContainerGenreMovies,
    genres__moviesCarousel,
    rightRowContainerGenreMovies
  );

  const genres__moviesControls = document.createElement("div");
  genres__moviesControls.className = "genres__moviesControls";

  genres__moviesContainer.append(
    genres__moviesContainerTitle,
    genres__moviesCarouselContainer,
    genres__moviesControls
  );

  genres__container.insertAdjacentElement("afterend", genres__moviesContainer);

  getAndAppendMovies(
    ".genres__moviesCarousel",
    "/discover/movie",
    [".genres__moviesControls",".leftRowContainerGenreMovies ",".rightRowContainerGenreMovies "],
    { params: { with_genres: genre[1],
                page: 2 } }
  );
  setTimeout(()=>{genres__moviesContainer.classList.add("active");},1)
}

function backToGenres() {
  const genres__moviesContainer = document.querySelector(".genres__moviesContainer");
  const genres__container = document.querySelector(".genres__container");
  
  setTimeout(()=>{genres__moviesContainer.classList.remove("active");},100)
  setTimeout(()=>{genres__moviesContainer.remove();},500)
  genres__container.classList.add("active")
}

function changeSection(section) {
  const sections = document.querySelectorAll(".main__exploreSection");
  const buttons = document.querySelectorAll(".main__exploreOptionsLi");
  const elements = [...sections, ...buttons];
  elements.forEach((element) => element.classList.remove("active"));
  const elementsGenres = [...document.querySelectorAll(section)];
  elementsGenres.forEach((element) => element.classList.add("active"));
}
