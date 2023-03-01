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


function callback(entries, observer){
  entries
  .filter(entry => entry.isIntersecting)
  .forEach(entry=> {
    if(entry.target.nodeName == "IMG"){
      const parent = entry.target.parentNode
      parent.classList.add("show")
      const img = entry.target
      const src = img.dataset.src
      img.setAttribute("src",src)


      observer.unobserve(entry.target)
    }
    if (entry.target.nodeName == "ARTICLE"){
      const article = entry.target
      const src = article.dataset.src
      article.style.backgroundImage = src
      observer.unobserve(entry.target)
    }

  })
}

const observer = new IntersectionObserver(callback,{})


async function getTopRatedtMovies() {
  const { data } = await api(`/movie/top_rated`);

  console.log(data);
  const hero = document.querySelector(".hero");
  const img = document.createElement("img");
  const random = Math.floor(Math.random() * 20);
  img.src = `${baseUrlImage}/original${data.results[random].backdrop_path}`;
  img.alt = "top rated movie image";
  img.className = "hero__img"
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
    const movie = data.results[18];
    genre.dataset.src =`url(${baseUrlImage}/w342${movie.poster_path})`
    observer.observe(genre)
  });
}

const carouselGenres = new Glider(document.querySelector(".genres__carousel"), {
  slidesToShow: 2,
  slidesToScroll: 2,
  draggable: false,
  dots: ".genres__controls",
  arrows: {
    prev: ".prevButtonGenres",
    next: ".nextButtonGenres",
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



async function getAndAppendMovies(
  parentContainer,
  path,
  optionalConfig,
) {
  const moviesContainer = document.querySelector(parentContainer);
  moviesContainer.innerHTML = "";
  const moviesCards = [];
  try{

    const { data } = await api(path, optionalConfig);
    
    const movies = data.results;
    if(movies.length < 2){
      console.log("aa")
      const container = document.createElement("div")
      container.style = "width:700px;height:400px;display:flex;align-items:center;justify-content:center;"
      const text = document.createElement("h2")
      container.append(text)
      text.innerText="We're sorry, we couldn't find what you're looking for."
      moviesContainer.append(container)
      return false
    }
    movies.forEach((movie) => {
      if(movie.poster_path){
        const movieCard = document.createElement("article");
        movieCard.classList.add("movieCard");
        movieCard.id = movie.id
        const movieImg = document.createElement("img");
        movieImg.classList.add("movieImg");
        movieImg.alt = movie.title;
        movieImg.dataset.src = baseUrlImage + "/w342" + movie.poster_path;
        observer.observe(movieImg)

        const movieTitle = document.createElement("h2");
        movieTitle.textContent = movie.title;
        movieTitle.classList.add("movieTitle");
        
        movieCard.append(movieImg, movieTitle);
        
        moviesCards.push(movieCard);
  }
});
console.log(data);
moviesContainer.append(...moviesCards);
return true
}catch{
  const container = document.createElement("div")
  const text = document.createElement("h2")
  container.append(text)
  text.innerText="We're sorry, we couldn't find what you're looking for."
  moviesContainer.append(container)
}
}

getGenresPreview();
getTopRatedtMovies();

