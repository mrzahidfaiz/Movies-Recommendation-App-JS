//  (IIFEs) Immediately Invoked Function Expressions 
(async function () {
  const response = await fetch("./movies.json");
  const movies = await response.json();
   //console.log(movies)

  // Select Boxes and html Elem
  const selectGenres = document.getElementById("genre");
  const selectYears = document.getElementById("year");
  const selectLang = document.getElementById("language");
  const selectRating = document.getElementById("rating");
  const buttonForSearch = document.getElementById("search");
  const divContainer = document.getElementById("display_Info");
  // console.log(divContainer)

  // Search Queries from SelectBoxs
  function SearchQueries() {
    const genresQuery = selectGenres.value;
    const yearsQuery = selectYears.value;
    const langQuery = selectLang.value;
    const ratingQuery = selectRating.value;
    let searchResults = movies;

    if (!_.isEmpty(genresQuery)) {
      searchResults = movies.filter((movie) => {
        let genres = movie.genres;
        // nested arrays in json file
        if (Array.isArray(movie.genres)) {
          genres = movie.genres.join("");
        }
        // convrt to tolowercase for search
        return genres.toLowerCase().includes(genresQuery);
      });
    }
    if (!_.isEmpty(yearsQuery)) {
      searchResults = searchResults.filter((movie) =>
        movie.release_date.includes(yearsQuery)
      );
    }
    if (!_.isEmpty(ratingQuery)) {
      searchResults = searchResults.filter(
        (movie) => Math.floor(movie.vote_average) == ratingQuery
      );
    }
    if (!_.isEmpty(langQuery)) {
      searchResults = searchResults.filter(
        (movie) => movie.original_language.toLowerCase() == langQuery
      );
    }
    displayResults(searchResults);
  }

  // Display Search Results on Ui
  function displayResults(filteredList) {
    filteredList.forEach((movie) => {
      let divRow = document.createElement("div");
      let genres = movie.genres;
      
      if (Array.isArray(movie.genres)) {
        genres = movie.genres.join(", ");
      }
      
      let ReleasingDates = new Date(movie.release_date);
      let years = ReleasingDates.getFullYear();

      // TotalHousrs
      let num = movie.runtime;
      let hours = Math.floor(num / 60);  
      let minutes = num % 60;
      let t_hours = `${hours}h:${minutes}mins`
      //console.log(t_hours)

      divContainer.appendChild(divRow);

      divRow.innerHTML = `
               <div class="container my-3 movie_card" >
               <div class="row" id="row_card">
               <div class="col-md-2">${Math.round(movie.popularity)}</div>
               <div class="col-md-2"><img src="https://image.tmdb.org/t/p/w45/${
                 movie.poster_path
               }" alt="logo" class="img-fluid"></div>
               <div class="col-md-5">${
                 movie.title
               }<br /><span class="movie-rating">${movie.certification}</span>
               <span> ${genres}</span><span> &#9733;${t_hours}</span></div>
               <div class="col-md-3 text-center">${years}</div>
               </div>
               </div>`;
    });
  }

  // clicker EventHanlder for Button
  buttonForSearch.addEventListener("click", SearchQueries);
})();
