console.log("Hello world")
const baseUrl = "https://api.themoviedb.org/3"
const baseUrlImage = "https://image.tmdb.org/t/p/w300"
async function getTrendingMovies(){
    const trendingMoviesContainer = document.querySelector(".main__trendingMovieContainer")
    const moviesCards = []
    const response = await fetch(`${baseUrl}/trending/movie/day?api_key=${API_KEY}`)
    const data = await response.json()
    const movies = data.results
    movies.forEach(movie => {
        const movieCard = document.createElement("article")
        movieCard.classList.add("main__movieCard")
        const movieImg = document.createElement("img")
        movieImg.classList.add("main__movieImg")
        movieImg.alt = movie.title
        movieImg.src = baseUrlImage+movie.poster_path

        const movieTitle = document.createElement("h4")
        movieTitle.textContent = movie.title
        movieTitle.classList.add("main__movieTitle")

        movieCard.append(movieImg,movieTitle)

        moviesCards.push(movieCard)
    });
    console.log(data)
    console.log(movies)
    trendingMoviesContainer.append(...moviesCards)

}
getTrendingMovies()