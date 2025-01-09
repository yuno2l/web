let movies = [];

document.getElementById("addForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("movieName").value;
  const image = document.getElementById("imageUrl").value;
  const episodes = parseInt(document.getElementById("episodes").value, 10);
  const status = document.getElementById("status").value;

  const newMovie = { name, image, episodes, status, watchedEpisodes: [] };
  movies.push(newMovie);

  saveMovies();
  displayMovies();
  document.getElementById("addForm").reset();
});

document.getElementById("searchBar").addEventListener("input", displayMovies);
document
  .getElementById("filterStatus")
  .addEventListener("change", displayMovies);

document.getElementById("searchButton").addEventListener("click", () => {
  const searchTerm = document.getElementById("searchBar").value.trim();
  if (searchTerm) {
    const url = `https://bflixto.top/filter?keyword=${encodeURIComponent(
      searchTerm
    )}`;
    window.location.href = url;
  }
});

function displayMovies() {
  const searchTerm = document.getElementById("searchBar").value.toLowerCase();
  const filter = document.getElementById("filterStatus").value;

  document.getElementById("movieList").innerHTML = "";
  movies
    .filter((movie) => {
      const searchCond = movie.name.toLowerCase().includes(searchTerm);
      const filterCond = filter === "all" || movie.status === filter;
      return searchCond && filterCond;
    })
    .forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("movie-card");
      card.innerHTML = `
          <img src="${movie.image}" alt="${movie.name}">
          <h3>${movie.name}</h3>
          <p>Status: ${movie.status}</p>
        `;

      card.addEventListener("click", () => {
        localStorage.setItem("selectedMovie", JSON.stringify(movie));
        window.location.href = "details.html";
      });

      document.getElementById("movieList").appendChild(card);
    });
}

function saveMovies() {
  localStorage.setItem("movies", JSON.stringify(movies));
}

function loadMovies() {
  const savedMovies = localStorage.getItem("movies");
  if (savedMovies) {
    movies = JSON.parse(savedMovies);
  }
  displayMovies();
}

loadMovies();
