const genresContainer = document.querySelector(".genres__carousel");
genresContainer.addEventListener("click", (entry) => {
  if (entry.target.nodeName === "ARTICLE" ) {
    const genre = entry.target;
    location.hash = `genre=${genre.id.slice(2)}=${genre.innerText}`;  }
  if (entry.target.nodeName === "H2" ) {
      const genre = entry.target.parentNode;
      location.hash = `genre=${genre.id.slice(2)}=${genre.innerText}`;  }
});


const changeSection__ul = document.querySelector(".changeSection__ul")
changeSection__ul.addEventListener("click",(entry)=>{
  if (entry.target.nodeName === "LI"){
    const li = entry.target


    location.hash = li.innerText
    
  }
})

const searchIcon = document.querySelector(".searchIcon")

searchIcon.addEventListener("click" ,() => {
  location.hash = "search="+searchInput.value
})


const main = document.querySelector(".main")

main.addEventListener("click",(entry)=>{
  if(entry.target.className =="movieImg"){
    location.hash = "movie="+entry.target.parentNode.id
  }
})


window.addEventListener("hashchange", navigator, false);
window.addEventListener("load", navigator, false);

function navigator() {
  if(location.hash.startsWith("#Trending")){
    changeSection("Trending","/trending/movie/day",{ params: { region: "US", page: 3 } })
  }
  else if(location.hash.startsWith("#New")){
    changeSection("New","/movie/now_playing",{ params: { region: "US"} })
  }
  else if(location.hash.startsWith("#Popular")){
    changeSection("Popular","/movie/popular",{ params: { region: "US", page: 3 } })
  }
  else if (location.hash.startsWith("#genre=")) {
    showGenre();
  } else if (location.hash.startsWith("#back")) {
    backToGenres()
  } else if (location.hash.startsWith("#search=")) {
    showSearch()
  } else if (location.hash.startsWith("#movie=")) {
    showMovie()
  } 
}


function showGenre() {

const genres__resultContainer = document.querySelector(".genres__resultContainer")
  const explore__section  = [...document.querySelectorAll(".explore__section")];

  explore__section.forEach(section => section.classList.remove("active"))
  const genre = location.hash.split("=")

  const genres__resultContainerTitle = document.createElement("h2")
  genres__resultContainerTitle.className = "genres__resultContainerTitle"
  genres__resultContainerTitle.innerText = decodeURI(genre[2]) 
  genres__resultContainerTitle.addEventListener("click",()=>{
    location.hash = "back"
  })

  const genres__resultMoviesContainer = document.createElement("div")
  genres__resultMoviesContainer.className = "genres__resultMoviesContainer"



  const leftRow =document.createElement("img")
  leftRow.src = "./src/assets/angle-left-solid.svg"
  leftRow.alt= "leftRow"
  leftRow.className = "leftRow"
  const prevButton = document.createElement ("button")
  prevButton.className = "leftRowContainerPage"
  prevButton.append(leftRow)

  const counterContainer = document.createElement("div")
  const counter = document.createElement("span")
  counter.innerText = "1"
  counter.id = "counter"
  counterContainer.appendChild(counter)

  const rightRow =document.createElement("img")
  rightRow.src = "./src/assets/angle-right-solid.svg"
  rightRow.alt= "rightRow"
  rightRow.className = "rightRow"
  const nextButton = document.createElement ("button")
  nextButton.className = "rightRowContainerPage"
  nextButton.append(rightRow)

  const genres__resultControls = document.createElement("div")
  genres__resultControls.className = "genres__resultControls"
  genres__resultControls.append(prevButton,counterContainer,nextButton)

  genres__resultControls.addEventListener("click",(entry)=>{
    if (entry.target.classList.contains("rightRow")){

      counter.innerText = parseInt(counter.innerText)+1
      getAndAppendMovies(".genres__resultMoviesContainer","/discover/movie",{ params: { with_genres: genre[1], page:counter.innerText} })
    }
    if(entry.target.classList.contains("leftRow") && parseInt(counter.innerText) > 1){
      counter.innerText = parseInt(counter.innerText)-1
      getAndAppendMovies(".genres__resultMoviesContainer","/discover/movie",{ params: { with_genres: genre[1], page:counter.innerText} })
    }
  })

  genres__resultContainer.append(genres__resultContainerTitle,genres__resultMoviesContainer,genres__resultControls)


  getAndAppendMovies(".genres__resultMoviesContainer",
  "/discover/movie",
  { params: { with_genres: genre[1]} }
  );

  genres__resultContainer.classList.add("active")
  genres__resultMoviesContainer.classList.add("active")
  // setTimeout(()=>{genres__resultContainer.classList.add("active");},200)
}

function backToGenres() {
  const genres = document.querySelector(".genres")
  const genres__resultContainer = document.querySelector(".genres__resultContainer")
  const search = document.querySelector(".search ")
  setTimeout(()=>{
    genres__resultContainer.classList.remove("active")
    search.classList.remove("active")
  },500)

  genres.classList.add("active")
  genres__resultContainer.innerHTML=""
  search.innerHTML = ""
}

async function changeSection(section,path,optionalConfig={}){

  
  const currentSection = document.querySelector(".currentSection")

  currentSection.innerHTML=""
  currentSection.id=section

  const changeSection__li = [...document.querySelectorAll(".changeSection__li")]
  changeSection__li.forEach(li =>{
    li.classList.remove("active")
  })
  const liActive = changeSection__li.find(li => li.innerText === section)
  liActive.classList.add("active")





  const leftRow =document.createElement("img")
  leftRow.src = "./src/assets/angle-left-solid.svg"
  leftRow.alt= "leftRow"
  leftRow.className = "leftRow"
  const prevButton = document.createElement ("button")
  prevButton.className = "leftRowContainer prevButton"
  prevButton.append(leftRow)

  const moviesContainer = document.createElement("div")
  moviesContainer.className ="moviesContainer"

  const rightRow =document.createElement("img")
  rightRow.src = "./src/assets/angle-right-solid.svg"
  rightRow.alt= "rightRow"
  rightRow.className = "rightRow"
  const nextButton = document.createElement ("button")
  nextButton.className = "rightRowContainer nextButton"
  nextButton.append(rightRow)

  const controls = document.createElement("div")
  controls.className = "controls"
  

  const currentSection__container = document.createElement("div")
  currentSection__container.className = "currentSection__container"
  currentSection__container.append(prevButton,moviesContainer,nextButton)


  currentSection.append(currentSection__container,controls)
  
  



  await getAndAppendMovies(
    ".moviesContainer",
    path,
    optionalConfig,
   
  );
  
   const moviesCarousel = await new Glider(
    document.querySelector(".moviesContainer"),
    {
      slidesToShow: 2,
      slidesToScroll: 2,
      draggable: false,
      dots: ".controls",
      arrows: {
        prev: ".prevButton",
        next: ".nextButton",
      },
      responsive: [
        {
          // screens greater than >= 540px
          breakpoint: 540,
          settings: {
            // Set to `auto` and provide item width to adjust to viewport
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          // screens greater than >= 780px
          breakpoint: 780,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          // screens greater than >= 1060px
          breakpoint: 1060,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
          },
        },   {
          // screens greater than >= 1320px
          breakpoint: 1320,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
          },
        }
      ],
    }
  ); 

  currentSection__container.classList.add("active")
}


function showSearch(){
  const search = document.querySelector(".search")
  const explore__section  = [...document.querySelectorAll(".explore__section")];
  search.innerHTML = ""
  explore__section.forEach(section => section.classList.remove("active"))

  const [_,query] = location.hash.split("=")
  queryDecode = decodeURI(query)
  const search__resultContainerTitle = document.createElement("h2")
  search__resultContainerTitle.className = "search__resultContainerTitle"
  search__resultContainerTitle.innerText = queryDecode
  search__resultContainerTitle.addEventListener("click",()=>{
    location.hash = "back"
  })

  const search__resultMoviesContainer = document.createElement("div")
  search__resultMoviesContainer.className = "search__resultMoviesContainer"



  const leftRow =document.createElement("img")
  leftRow.src = "./src/assets/angle-left-solid.svg"
  leftRow.alt= "leftRow"
  leftRow.className = "leftRow"
  const prevButton = document.createElement ("button")
  prevButton.className = "leftRowContainerPage"
  prevButton.append(leftRow)

  const counterContainer = document.createElement("div")
  const counter = document.createElement("span")
  counter.innerText = "1"
  counter.id = "counter"
  counterContainer.appendChild(counter)

  const rightRow =document.createElement("img")
  rightRow.src = "./src/assets/angle-right-solid.svg"
  rightRow.alt= "rightRow"
  rightRow.className = "rightRow"
  const nextButton = document.createElement ("button")
  nextButton.className = "rightRowContainerPage"
  nextButton.append(rightRow)

  const search__resultControls = document.createElement("div")
  search__resultControls.className = "search__resultControls"
  search__resultControls.append(prevButton,counterContainer,nextButton)

  search__resultControls.addEventListener("click",(entry)=>{


    if (entry.target.classList.contains("rightRow")){

      counter.innerText = parseInt(counter.innerText)+1
      getAndAppendMovies(".search__resultMoviesContainer","/search/movie",{ params: {query:queryDecode,page:counter.innerText} })
    }
    if(entry.target.classList.contains("leftRow") && parseInt(counter.innerText) > 1){
      counter.innerText = parseInt(counter.innerText)-1
      if(getAndAppendMovies(".search__resultMoviesContainer","/search/movie",{ params: {query:queryDecode,page:counter.innerText} })){}
    }
  })

  search.append(search__resultContainerTitle,search__resultMoviesContainer,search__resultControls)


  getAndAppendMovies(".search__resultMoviesContainer",
  "/search/movie",
  { params: {query:queryDecode} }
  );

  search.classList.add("active")
  search__resultMoviesContainer.classList.add("active")
  searchInput.value = ""
}


async function showMovie(){
  const body = document.querySelector("body")
  body.classList.add("inactive")
  const [_,id] = location.hash.split("=")
  const {data} = await api(`/movie/${id}`)
  console.log(data)
  const movieDescription = document.querySelector(".movieDescription")
  movieDescription.classList.add("active")
  const movieDescription__imgContainer = document.querySelector(".movieDescription__imgContainer")
  const movieDescriptionImg = document.createElement("img")
  movieDescriptionImg.src = `${baseUrlImage}/original${data.backdrop_path}`
  movieDescriptionImg.alt="movieImg"
  movieDescriptionImg.className = "movieDescription__img"
  movieDescription__imgContainer.appendChild(movieDescriptionImg)
  const movieDescription__title = document.querySelector(".movieDescription__title")
  movieDescription__title.innerText = data.title
  const movieDescription__overview = document.querySelector(".movieDescription__overview")
  movieDescription__overview.innerText = data.overview
  movieRate.innerText = Math.round(data.vote_average)

}

const movieDescription__back = document.querySelector(".movieDescription__back")
movieDescription__back.addEventListener("click",(entry)=>{
  location.hash = "home"
  const body = document.querySelector("body")
  body.classList.remove("inactive")
  const movieDescription = document.querySelector(".movieDescription")
  movieDescription.classList.remove("active")
  const movieDescription__imgContainer = document.querySelector(".movieDescription__imgContainer")
  movieDescription__imgContainer.innerHTML = ""
})

if(location.hash != "#New" && location.hash != "#Popular" && location.hash != "#Trending") changeSection("Trending","/trending/movie/day")

