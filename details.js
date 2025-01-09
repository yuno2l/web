const movie = JSON.parse(localStorage.getItem("selectedMovie"));
const storedMovies = localStorage.getItem("movies");
let movies;
if (storedMovies) {
  movies = JSON.parse(storedMovies);
} else {
  movies = [];
}

if (movie) {
  document.getElementById("detailsImage").src = movie.image;
  document.getElementById("detailsTitle").textContent = movie.name;

  loadEpisodes();
}

function toggleEpisode(episodeNumber) {
  const watchedEpisodes = movie.watchedEpisodes;

  if (watchedEpisodes.includes(episodeNumber)) {
    movie.watchedEpisodes = watchedEpisodes.filter(
      (ep) => ep !== episodeNumber
    );
  } else {
    watchedEpisodes.push(episodeNumber);
  }

  localStorage.setItem("selectedMovie", JSON.stringify(movie));

  const movieIndex = movies.findIndex((m) => m.name === movie.name);
  if (movieIndex !== -1) {
    movies[movieIndex] = movie;
    localStorage.setItem("movies", JSON.stringify(movies));
  }

  loadEpisodes();
}

function loadEpisodes() {
  document.getElementById("detailsEpisodes").innerHTML = "";

  for (let i = 1; i <= movie.episodes; i++) {
    const episode = document.createElement("div");
    episode.className = "episode";
    if (movie.watchedEpisodes.includes(i)) {
      episode.classList.add("watched");
    }
    episode.textContent = i;
    episode.addEventListener("click", () => toggleEpisode(i));
    document.getElementById("detailsEpisodes").appendChild(episode);
  }
}

document.getElementById("deleteButton").addEventListener("click", () => {
  const movieIndex = movies.findIndex((m) => m.name === movie.name);
  if (movieIndex !== -1) {
    movies.splice(movieIndex, 1);
    localStorage.setItem("movies", JSON.stringify(movies));
    localStorage.removeItem("selectedMovie");
    window.location.href = "index.html";
  }
});

//zid update lel movie
document.getElementById("backButton").addEventListener("click", () => {
  localStorage.setItem("selectedMovie", JSON.stringify(movie));
  window.location.href = "index.html";
});

//lel refresh
window.addEventListener("beforeunload", () => {
  localStorage.setItem("selectedMovie", JSON.stringify(movie));
});

loadEpisodes();
