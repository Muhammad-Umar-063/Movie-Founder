let searchTimeout;
let all_results = [];

function handleSearchInput() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(realTimeSearch, 500);
}

async function realTimeSearch() {
    try {
        const query = document.getElementById("movie_search").value.trim();
        localStorage.setItem("query", JSON.stringify(query));
        const resultsContainer = document.getElementById("search-results");
        resultsContainer.innerHTML = "";

        if (!query) {
            resultsContainer.style.display = "none";
            return;
        }

        let res = await fetch(
            `https://www.omdbapi.com/?apikey=7d26767f&s=${query}`
        );
        const data = await res.json();
        localStorage.setItem("data", JSON.stringify(data));

        if (data.Response === "False") {
            all_results = [];
            localStorage.setItem("all_results", JSON.stringify([]));
            resultsContainer.style.display = "none";
            return;
        }

        all_results = data.Search;
        localStorage.setItem("all_results", JSON.stringify(all_results));
        // console.log(all_results)
        const topresults = data.Search.slice(0, 10);
        topresults.forEach((movie) => {
            const div = document.createElement("div");
            div.textContent = movie.Title;
            div.onclick = () => {
                document.getElementById("movie_search").value = movie.Title;
                resultsContainer.style.display = "none";
                movies();
            };
            resultsContainer.appendChild(div);
        });

        if (data.Search.length > 5) {
            const moreDiv = document.createElement("div");
            moreDiv.innerHTML = `<a href="all-results.html" target="">See all results</a>`;
            resultsContainer.appendChild(moreDiv);
        }

        resultsContainer.style.display = "block";
    } catch (e) {
        console.log("Search Error", e);
    }
}

async function movies() {
    try {
        const search = document.getElementById("movie_search").value.trim();
        const title_element = document.getElementById("title");
        const plot_element = document.getElementById("plot");
        const release_element = document.getElementById("release");
        const season_element = document.getElementById("seasons");
        const poster_element = document.getElementById("poster");
        
        if (!search) {
            title_element.textContent = "Search Movie Name!";
            plot_element.textContent = "";
            release_element.textContent = "";
            season_element.textContent = "";
            poster_element.style.display = "none";
            return;
        }

        // const clicked_movie = localStorage.getItem("selectedmovie")
        // if(clicked_movie){
        //     let res = await fetch(`https://www.omdbapi.com/?apikey=7d26767f&i=${clicked_movie}`)
        //     let data = await res.json()
            
        //     if(data.Response !== "False")
        //         showdata(data)
        //     return
        // }

        title_element.textContent = "Searching...";
        let response = await fetch(
            `https://www.omdbapi.com/?apikey=7d26767f&t=${search}`
        );
        const data = await response.json();
        console.log(data);
        // debugger;

        if (data.Response === "False") {
            title_element.textContent = "Movie not found!";
            plot_element.textContent = "";
            release_element.textContent = "";
            season_element.textContent = "";
            poster_element.style.display = "none";
            return;
        }
        showdata(data)
        function showdata(data){
        const title = data.Title;
        title_element.textContent = title;
        const plot = data.Plot;
        plot_element.textContent = plot;
        const released = data.Released;
        release_element.textContent = "Released: " + released;
        const Seasons = data.totalSeasons;
        season_element.textContent = "Total Seasons: " + Seasons;
        const poster = data.Poster;
        poster_element.style.display = "";
        poster_element.src = poster;
        }
    } catch (error) {
        console.log(error);
    }
}
movies();
