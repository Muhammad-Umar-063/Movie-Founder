
let searchTimeout
let all_results = [];

function handleSearchInput() {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(realTimeSearch, 500)
}

async function realTimeSearch() {
   try{
    const query = document.getElementById("movie_search").value.trim()
    const resultsContainer = document.getElementById("search-results")
    resultsContainer.innerHTML = "";

    if (!query){
    resultsContainer.style.display = "none";
    return
    }

    let res = await fetch(`https://www.omdbapi.com/?apikey=7d26767f&s=${query}`);
    const data = await res.json();

    if (data.Response === "False") {
    all_results = []
    resultsContainer.style.display = "none";
    return
    }

    all_results = data.Search
    const topresults = data.Search.slice(0,5)
    topresults.forEach(movie => {
        const div = document.createElement("div")
        div.textContent = movie.Title
        div.onclick = () => {
            document.getElementById("movie_search").value = movie.Title;
            resultsContainer.style.display = "none";
            movies()
        }
        resultsContainer.appendChild(div);
    });
    resultsContainer.style.display = "block"
    }
    catch(e){
        console.log("Search Error", e)
    }
}



async function movies() {
    try{
    const search = document.getElementById("movie_search").value.trim()
    const title_element = document.getElementById("title")
    const plot_element = document.getElementById("plot")
    const release_element = document.getElementById("release")
    const season_element = document.getElementById("seasons")
    const poster_element = document.getElementById("poster")

    if(!search){
        title_element.textContent = "Search Movie Name!"
        return
    }
    title_element.textContent = "Searching...";

    let response = await fetch(`https://www.omdbapi.com/?apikey=7d26767f&t=${search}`);
    const data = await response.json();
    console.log(data)
    // debugger;

    if (data.Response === "False") {
    title_element.textContent = "Movie not found!";
    plot_element.textContent = "";
    release_element.textContent = "";
    season_element.textContent = "";
    poster_element.style.display = "none";
    return;
  }
    const title = data.Title
    title_element.textContent = title
    const plot = data.Plot
    plot_element.textContent = plot
    const released = data.Released
    release_element.textContent = "Released: " + released
    const Seasons = data.totalSeasons
    season_element.textContent = "Total Seasons: " + Seasons
    const poster = data.Poster
    poster_element.style.display = ""
    poster_element.src = poster
    }
    catch(error){
        console.log(error)
    }
}
movies()






// chat gpt code 





// let searchTimeout;

// function handleSearchInput() {
//   clearTimeout(searchTimeout);
//   searchTimeout = setTimeout(realTimeSearch, 500); // 0.5s debounce
// }

// async function realTimeSearch() {
//   const query = document.getElementById("movie_search").value.trim();
//   const resultsContainer = document.getElementById("search-results");

//   if (!query) {
//     resultsContainer.style.display = "none";
//     return;
//   }

//   try {
//     const res = await fetch(`https://www.omdbapi.com/?apikey=7d26767f&s=${query}`);
//     const data = await res.json();

//     if (data.Response === "False") {
//       resultsContainer.style.display = "none";
//       return;
//     }

//     // Store all results for the results page
//     localStorage.setItem("searchResults", JSON.stringify(data.Search));

//     // Clear previous results
//     resultsContainer.innerHTML = "";

//     // Show top 5 results
//     const topResults = data.Search.slice(0, 5);
//     topResults.forEach(movie => {
//       const div = document.createElement("div");
//       div.textContent = movie.Title;
//       div.classList.add("search-item");
//       div.onclick = () => {
//         document.getElementById("movie_search").value = movie.Title;
//         resultsContainer.style.display = "none";
//         showMovieDetails(movie.Title);
//       };
//       resultsContainer.appendChild(div);
//     });

//     // Add "View All Results →" link
//     const viewAll = document.createElement("div");
//     viewAll.innerHTML = `<a href="results.html" style="color: #fff; text-decoration: underline;">View all results →</a>`;
//     viewAll.classList.add("view-all-link");
//     resultsContainer.appendChild(viewAll);

//     resultsContainer.style.display = "block";

//   } catch (error) {
//     console.error("Search error:", error);
//   }
// }

// // ----------------------
// // Show movie details
// // ----------------------
// async function showMovieDetails(title) {
//   try {
//     const response = await fetch(`https://www.omdbapi.com/?apikey=7d26767f&t=${title}`);
//     const data = await response.json();

//     const titleEl = document.getElementById("title");
//     const plotEl = document.getElementById("plot");
//     const releaseEl = document.getElementById("release");
//     const seasonEl = document.getElementById("seasons");
//     const posterEl = document.getElementById("poster");

//     if (data.Response === "False") {
//       titleEl.textContent = "Movie not found!";
//       plotEl.textContent = "";
//       releaseEl.textContent = "";
//       seasonEl.textContent = "";
//       posterEl.style.display = "none";
//       return;
//     }

//     titleEl.textContent = data.Title;
//     plotEl.textContent = data.Plot;
//     releaseEl.textContent = "Released: " + data.Released;
//     seasonEl.textContent = data.totalSeasons ? "Total Seasons: " + data.totalSeasons : "";
    
//     if (data.Poster && data.Poster !== "N/A") {
//       posterEl.style.display = "";
//       posterEl.src = data.Poster;
//     } else {
//       posterEl.style.display = "none";
//     }

//   } catch (error) {
//     console.error("Details fetch error:", error);
//   }
// }