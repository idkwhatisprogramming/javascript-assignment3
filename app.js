(async function () {
    const response = await fetch("./data.json");
    const movies = await response.json();

    const btnEle = document.getElementById("searchBTN");
    const inputEle = document.getElementById("searchINP");
    const listEle = document.getElementById("movie-list");
    const containerEle = document.getElementById("movieDetailsContainer");

    function search() {
        const value = inputEle.value.toLowerCase();
        const result = movies.filter(function (movie) {
            let genresString = "";
            if (typeof movie.genres === "string") {
                genresString = movie.genres.toLowerCase();
            } else if (Array.isArray(movie.genres)) {
                genresString = movie.genres.join(" ").toLowerCase();
            }

            return (
                movie.title.toLowerCase().includes(value) ||
                movie.original_language.toLowerCase().includes(value) ||
                genresString.includes(value) ||
                movie.tagline.toLowerCase().includes(value) ||
                movie.overview.toLowerCase().includes(value)
            );

        });
        displaySearchResult(result);

    }

    btnEle.addEventListener("click", search)

    function displaySearchResult(result) {
        listEle.innerHTML = "";
        result.forEach(function (movie) {
            const li = document.createElement("li");
            const ListItem = `
            <h2 className="title">${movie.title}</h2>
            <div className="description">${movie.genres}</div>
            <div className="description"><b>Languages: </b>${movie.original_language}</div>
            <div className="description"><b>Cast: </b>${movie.cast.map(actor => actor.name)
                    .join(", ")}</div>
                <div className="description"><b>Release Date: </b>${movie.release_date}</div>
            `

            li.innerHTML = ListItem
            li.addEventListener("click", function () {
                loadMovieDetails(movie);
            });
            listEle.appendChild(li)
        });
    }
    function loadMovieDetails(movie) {
        containerEle.innerHTML = `
            <h2 class="title">${movie.title}</h2>
            <h3>Genres:</h3>
            <ul>${movie.genres.map(function (genres) {
            return "<li>" + genres + "</li>"
        }).join("")}</ul>
            <h3>Overview:</h3>
            <div>${movie.overview}</div>
            <h3>Run Time:</h3>
            <div>${movie.runtime}</div>
            <h3>Budget:</h3>
            <div>${movie.budget} $</div>
            <h3>Revenue:</h3>
            <div>${movie.revenue} $</div>
            <h3>Rating:</h3>
            <div>${movie.vote_average} </div>
            <h3>Popularity:</h3>
            <div>${movie.popularity} </div>
            <h3>Directors:</h3>
            <div className="description">${movie.directors.map(directors => directors.name)
                .join(", ")}</div>
            <h3>Writers:</h3>
            <div className="description">${movie.writers.map(directors => directors.name)
                .join(", ")}</div>
        `;
    }



})();