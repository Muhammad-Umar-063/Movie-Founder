let currentPage = 1;
let totalPages = 1;
const userquery = JSON.parse(localStorage.getItem("query"));
let searched_data = JSON.parse(localStorage.getItem("data")) || null;
const resultsContainer = document.getElementById("results-page");
const pagination = document.querySelector(".pagination");

fetchingpages(1);

async function fetchingpages(page) {
  try {
    currentPage = page;
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=7d26767f&s=${userquery}&page=${page}`
    );
    const data = await res.json();
    searched_data = data;

    if (!data || data.Response === "False") {
      resultsContainer.innerHTML = "No Results Found.";
      pagination.innerHTML = "";
      totalPages = 1;
      return;
    }

    totalPages = Math.ceil(Number(data.totalResults) / 10);
    renderresults(data.Search);
    paginationbuttons(totalPages);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

function renderresults(results) {
  resultsContainer.innerHTML = "";

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.innerHTML = `<strong style="color:lightblue;" >${movie.Title}</strong> (${movie.Year})`;
    div.style.cursor = "pointer"
    div.onclick = (u) => {
        u.preventDefault()
        localStorage.setItem("selectedmovie", JSON.stringify(movie.imdbID))
        window.location.href = "index.html"
    }
    resultsContainer.appendChild(div);
  });
}

function paginationbuttons(totalPages) {
  pagination.innerHTML = "";

  const prev = document.createElement("li");
  prev.innerHTML = `<a href="#">Prev</a>`;
  prev.onclick = (u) => {
    u.preventDefault(); //prevent default is used to prevent the default action of the event from occurring.
    if (currentPage > 1) fetchingpages(currentPage - 1);
  };
  pagination.appendChild(prev);

  let start = Math.max(1, currentPage - 3);
  let end = Math.min(totalPages, currentPage + 3);

  if (start > 1) {
    const dot1 = document.createElement("li");
    dot1.innerHTML = `<a href="#">...</a>`;
    dot1.onclick = () => fetchingpages(1);
    pagination.appendChild(dot1);
  }

  for (let i = start; i <= end; i++) {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#">${i}</a>`;
    if (i === currentPage) li.classList.add("active");
    li.onclick = () => fetchingpages(i);
    pagination.appendChild(li);
  }

  if (end < totalPages) {
    const dot2 = document.createElement("li");
    dot2.innerHTML = `<a href="#">...</a>`;
    dot2.onclick = () => fetchingpages(totalPages);
    pagination.appendChild(dot2);
  }

  const next = document.createElement("li");
  next.innerHTML = `<a href="#">Next</a>`;
  next.onclick = (e) => {
    e.preventDefault()
    if (currentPage < totalPages) {
        fetchingpages(currentPage + 1);
    }
    // else 
    //     next.classList.add("disabled");
  };
  pagination.appendChild(next);
}

// CHAT GPT CODE......

// function paginationButtons(totalPages){
//     pagination.innerHTML = "";

//     // Prev
//     const prev = document.createElement("li");
//     prev.innerHTML = `<a href="#">Prev</a>`;
//     if (currentPage > 1) {
//         prev.onclick = () => fetchingpages(currentPage - 1)
//     }
//     pagination.appendChild(prev);

//     // Page Numbers
//     for(let i = 1; i <= totalPages; i++){
//         const li = document.createElement("li");
//         li.innerHTML = `<a href="#">${i}</a>`;

//         if (i === currentPage) {
//             li.classList.add("active");
//         }

//         li.onclick = () => fetchingpages(i);
//         pagination.appendChild(li);
//     }

//     // Next
//     const next = document.createElement("li");
//     next.innerHTML = `<a href="#">Next</a>`;
//     if (currentPage < totalPages) {
//         next.onclick = () => fetchingpages(currentPage + 1);
//     }
//     pagination.appendChild(next);
// }

// // CHATGPT CODE

// // === CONFIG ===
// const resultsContainer = document.getElementById("results-page");
// let currentPage = 1;
// let totalPages = 1; // updated after first API call
// const lastquery = localStorage.getItem("query"); // Save user search text
// const API_KEY = "7d26767f"; // replace

// // === INITIAL LOAD ===
// loadPage(1);

// // === FETCH & RENDER ===
// async function loadPage(page) {
//     currentPage = page;

//     const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${lastquery}&page=${page}`);
//     const data = await res.json();

//     if (data.Response === "False") {
//         resultsContainer.innerHTML = "No results found";
//         return;
//     }

//     totalPages = Math.ceil(data.totalResults / 10);

//     renderResults(data.Search);
//     renderPagination();
// }

// // === SHOW RESULTS ===
// function renderResults(results) {
//     resultsContainer.innerHTML = "";
//     results.forEach(movie => {
//         const div = document.createElement("div");
//         div.innerHTML = `<strong>${movie.Title}</strong> (${movie.Year})`;
//         resultsContainer.appendChild(div);
//     });
// }

// // === DYNAMIC PAGINATION ===
// function renderPagination() {
//     const pagination = document.querySelector(".pagination");
//     pagination.innerHTML = ""; // RESET OLD BUTTONS

//     // Prev
//     const prev = document.createElement("li");
//     prev.innerHTML = `<a href="#">Prev</a>`;
//     prev.onclick = () => {
//         if (currentPage > 1) loadPage(currentPage - 1);
//     };
//     pagination.appendChild(prev);

//     // Numbered pages
//     for (let i = 1; i <= totalPages; i++) {
//         const li = document.createElement("li");
//         li.innerHTML = `<a href="#">${i}</a>`;
//         if (i === currentPage) li.classList.add("active");
//         li.onclick = () => loadPage(i);
//         pagination.appendChild(li);
//     }

//     // Next
//     const next = document.createElement("li");
//     next.innerHTML = `<a href="#">Next</a>`;
//     next.onclick = () => {
//         if (currentPage < totalPages) loadPage(currentPage + 1);
//     };
//     pagination.appendChild(next);
// }
