const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
  },
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

const baseUrlImage = "https://image.tmdb.org/t/p";


async function getTopRatedtMovies() {
  const { data } = await api(`/movie/top_rated`);

  console.log(data);
  const hero = document.querySelector(".hero");
  const img = document.createElement("img");
  const random = Math.floor(Math.random() * 20);
  img.src = `${baseUrlImage}/original${data.results[random].backdrop_path}`;
  img.alt = "top rated movie image";
  const overview = document.querySelector(".hero__overview");
  overview.textContent = data.results[random].overview;
  const rate = document.querySelector("#rate");
  rate.textContent = data.results[random].vote_average;
  const title = document.querySelector(".hero__title");
  title.textContent = data.results[random].title;
  hero.insertAdjacentElement("afterbegin", img);
}

function getGenresPreview() {
  const genres = [...document.querySelectorAll(".genre")];
  genres.forEach(async (genre) => {
    const { data } = await api(`/discover/movie`, {
      params: {
        with_genres: genre.id.slice(2),
      },
    });
    const movie = data.results[5];
    genre.style.backgroundImage = `url(${baseUrlImage}/original${movie.poster_path})`;
  });
}

const carouselGenres = new Glider(document.querySelector(".genres__carousel"), {
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: false,
  dots: ".genres__controls",
  arrows: {
    prev: ".leftRowContainerGenres",
    next: ".rightRowContainerGenres",
  },
  responsive: [
    {
      // screens greater than >= 400px
      breakpoint: 400,
      settings: {
        // Set to `auto` and provide item width to adjust to viewport
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      // screens greater than >= 600px
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      // screens greater than >= 800px
      breakpoint: 800,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      // screens greater than >= 1080px
      breakpoint: 1080,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
  ],
});

async function getAndAppendMovies(parentContainer,path,controls,optionalConfig={}){
    const moviesContainer = document.querySelector(parentContainer)
    const moviesCards = [];
    const { data } = await api(path,optionalConfig);
    const movies = data.results;
    movies.forEach((movie) => {
      const movieCard = document.createElement("article");
      movieCard.classList.add("movieCard");
      const movieImg = document.createElement("img");
      movieImg.classList.add("movieImg");
      movieImg.alt = movie.title;
      movieImg.src = baseUrlImage + "/w300" + movie.poster_path;
      const movieTitle = document.createElement("h2");
      movieTitle.textContent = movie.title;
      movieTitle.classList.add("movieTitle");
  
      movieCard.append(movieImg, movieTitle);
  
      moviesCards.push(movieCard);
    });
    console.log(data);
    moviesContainer.append(...moviesCards);

    const moviesCarousel = await new Glider(document.querySelector(parentContainer),
      {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        dots: controls[0],
        arrows: {
          prev: controls[1],
          next: controls[2],
        },
        responsive: [
          {
            // screens greater than >= 400px
            breakpoint: 400,
            settings: {
              // Set to `auto` and provide item width to adjust to viewport
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            // screens greater than >= 680px
            breakpoint: 680,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            // screens greater than >= 1080px
            breakpoint: 1080,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
            },
          },
        ],
      }
    );

}



getGenresPreview();
getAndAppendMovies(".trending__moviesContainer","/trending/movie/day",[".trending__controls",".leftRowContainer ",".rightRowContainer "])
getTopRatedtMovies();
