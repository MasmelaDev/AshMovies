

const baseUrl = "https://api.themoviedb.org/3";
const baseUrlImage = "https://image.tmdb.org/t/p";
async function getTrendingMovies() {

    const trendingMoviesContainer = document.querySelector(".trending__moviesContainer")
    const moviesCards = [];
    const response = await fetch(
        `${baseUrl}/trending/movie/day?api_key=${API_KEY}`
        );
  const data = await response.json();
  const movies = data.results;
  movies.forEach((movie) => {
    const movieCard = document.createElement("article");
    movieCard.classList.add("trending__movieCard");
    const movieImg = document.createElement("img");
    movieImg.classList.add("trending__movieImg");
    movieImg.alt = movie.title;
    movieImg.src = baseUrlImage +"/w300"+ movie.poster_path;

    const movieTitle = document.createElement("h4");
    movieTitle.textContent = movie.title;
    movieTitle.classList.add("trending__movieTitle");

    movieCard.append(movieImg, movieTitle);

    moviesCards.push(movieCard);
  });
  console.log(data);
  console.log(movies);
  trendingMoviesContainer.append(...moviesCards);
  const carousel = await new Glider(document.querySelector(".trending__moviesContainer"),{
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    dots: '.trending__controls',
    arrows: {
        prev: '.trending__leftRowContainer',
        next: '.trending__rightRowContainer'
    },
    responsive: [
        {
          // screens greater than >= 400px
          breakpoint: 400,
          settings: {
            // Set to `auto` and provide item width to adjust to viewport
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },{
          // screens greater than >= 680px
          breakpoint: 680,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },{
            // screens greater than >= 1080px
            breakpoint: 1080,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
            }
          }
      ]


});
}



async function getLatestMovie(){
  const res = await fetch(`${baseUrl}/movie/top_rated?api_key=${API_KEY}`)
  const data = await res.json()
  console.log(data)
  const hero = document.querySelector(".hero")
  const img = document.createElement("img")
  const random = Math.floor(Math.random() * 20);
  img.src = `${baseUrlImage}/original${data.results[random].backdrop_path}`
  const overview = document.querySelector(".hero__overview")
  overview.textContent = data.results[random].overview
  const rate = document.querySelector("#rate")
  rate.textContent= data.results[random].vote_average
  const title = document.querySelector(".hero__title")
  title.textContent = data.results[random].title
  hero.insertAdjacentElement("afterbegin",img)
}

async function getCategories(){
  const res = await fetch(`${baseUrl}/genre/movie/list?api_key=${API_KEY}`)
  const data = await res.json()
  console.log(data)
}

getCategories()
getTrendingMovies();
getLatestMovie()