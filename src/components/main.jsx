import React, { useState, useEffect } from "react";
import Card from "./card.jsx";

const API_KEY = "api_key=fbe3f1cacc556f9a987831945b408a52";
const BASE_URL = "https://api.themoviedb.org/3";
const INITIAL_URL = BASE_URL + "/movie/popular?" + API_KEY;
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;
const categories = ["Popular", "Theatre", "Kids", "Drama", "Comedies"];

const Main = () => {
    const [movieData, setMovieData] = useState([]);
    const [urlSet, setUrlSet] = useState(INITIAL_URL);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(urlSet);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setMovieData(data.results || []);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, [urlSet]);

    const getData = (movieType) => {
        let newUrl;
        if (movieType === "Popular") {
            newUrl = BASE_URL + "/movie/popular?" + API_KEY;
        } else if (movieType === "Theatre") {
            newUrl = BASE_URL + "/movie/now_playing?" + API_KEY;
        } else if (movieType === "Kids") {
            newUrl = BASE_URL + "/discover/movie?with_genres=10751&" + API_KEY;
        } else if (movieType === "Drama") {
            newUrl = BASE_URL + "/discover/movie?with_genres=18&" + API_KEY;
        } else if (movieType === "Comedies") {
            newUrl = BASE_URL + "/discover/movie?with_genres=35&" + API_KEY;
        }
        setUrlSet(newUrl);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            const searchUrl = `${SEARCH_URL}&query=${encodeURIComponent(searchTerm)}`;
            setUrlSet(searchUrl);
        }
    };

    return (
        <>
            <div className="header">
                <nav>
                    <ul>
                        {categories.map((value) => (
                            <li key={value}>
                                <a href="#" onClick={() => getData(value)}>
                                    {value}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <form onSubmit={handleSearch}>
                    <div className="search-btn">
                        <input
                            type="text"
                            placeholder="Search for a movie..."
                            className="inputText"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </form>
            </div>

<div
  className="overview"
  style={{
    alignContent:  "center",
    textAlign: "center",
    padding: "20px",
    width: "100%",
    backgroundColor: "",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  }}
>
  <h1
    style={{
      fontSize: "2.5rem",
      color: "white",
      marginBottom: "10px"
    }}
  >
    Welcome to Zegemath Movie Recommendation App
  </h1>
  <p
    style={{
      fontSize: "1.2rem",
      color: "#666"
    }}
  >
    Search for movies or explore recommendations!
  </p>

  <h1><a href="/register">Get started</a></h1>
</div>

            <div className="container">

                {movieData.length === 0 ? (
                    <p className="notfound">Not Found</p>
                ) : (
                    movieData.map((movie) => <Card info={movie} key={movie.id} />)
                )}
            </div>
        </>
    );
};

export default Main;
