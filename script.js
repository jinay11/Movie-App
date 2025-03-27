const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

// function to fetch movie details using API
const getMovieInfo = async (movie) => {

    const myApiKey = '32501450';
    const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;
    const response = await fetch(url);
    const data = await response.json();

    showMovieData(data);
}

// function to show movie data to screen
const showMovieData = (data) => {
    movieContainer.innerHTML = " ";
    movieContainer.classList.remove('noBackground');
    // array destructuring data
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add("movie-info")
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088</strong>${imdbRating}</p>
    `
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieContainer.appendChild(movieElement)
    movieElement.appendChild(movieGenreElement);
    movieElement.innerHTML += `<p><strong>Released Date:</strong> ${Released}</p>
    <p><strong>Duration:</strong> ${Runtime}</p>
    <p><strong>Cast:</strong> ${Actors}</p>
    <p><strong>Ploat:</strong> ${Plot}</p>
    `
    // creating a div movie poster
    const moviePosterElement = document.createElement("div");
    moviePosterElement.classList.add("movie-poster");
    moviePosterElement.innerHTML = `<img src=${Poster}/>`
    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}

// adding event listener to search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const moviName = inputBox.value.trim();
    if (moviName !== '') {
        getMovieInfo(moviName);
    } else {
        movieContainer.innerHTML = `<h2>Enter Movie name to get movie information</h2>`
        movieContainer.classList.add('noBackground');
    }
})