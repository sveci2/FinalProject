// I decided pass the API key as a parameter to const APIURL and I concatinated it.
const APIKEY = 'api_key=2020a8dcf3564ed5756cd2afc5a73545';
const BASEURL = 'https://api.themoviedb.org/3';
// By default I'm sorting movies based on their popularity (available also relase date, vote average, etc..)
const APIURL = BASEURL + '/discover/movie?sort_by=popularity.desc&' 
+APIKEY;

/*I'm downloading images in the original resolution. For saving some data I can load
a lower resolution i.e. w1200 or w300. This affects the loading speed*/
const IMGPATH = "https://image.tmdb.org/t/p/original";

/* I also created the searchapi variable and connected that with the search button.
search api allows us to search the database. In this case I need to use the whole like including api key*/
const SEARCHAPI =
     "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

/*getMovies initializes the extraction of the most popular movies from the database
we are getting results (APIURL) assigned to getMovies. Using async function I added the parameter (url).
In this function I'm also fetching the data from url and in another variable converting them to json 
and console.log them.

I used async function as we're fetching data from the server and using wait we're waiting until the promise returns the fetched data*/

getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}


function showMovies(movies) {
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");


/*For the image I'm using the base url from IMGPATH and combine it with poster_path parameter (as listed in the objects' parameters)
In the const movie (above) I'm defining which parameters I'm using. Later I'm calling them.
If we want to call more parameters of the movie, we need to assign them first to the movie variable.*/
        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
           
                <span class="vote_average">
                ${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

/* we want to prevent the search if the box is empty.
If the search bar is not empty, then go to the new variable searchTerm, defined as searched value.*/
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});