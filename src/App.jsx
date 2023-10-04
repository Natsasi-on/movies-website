// Import necessary modules and components
import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import SearchIcon from "./assets/search.svg";
import "./App.css";

// OMDB API URL
const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

// Define the main App component
const App = () => {
  // Define state variables using useState hook
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  // Use useEffect to perform an initial movie search when the component mounts
  useEffect(() => {
    // Initial search for "captain movies
    searchMovies("captain");
  }, []);

  // Define a function to search for movies using the OMDB API
  const searchMovies = async (title) => {
    // Send a GET request to the OMDB API
    const response = await fetch(`${API_URL}&s=${title}`);
    // Parse the JSON response
    const data = await response.json();
    // Update the movies state with the search results
    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieMagicBox</h1>

      {/* Search input and button */}
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)} // Trigger a movie search when the button is clicked
        />
      </div>

      {/* Display movies if there are search results, otherwise display a message */}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (

        <div className="container2">
          <h2>No movies found</h2>
          <div className="movie"></div>
        </div>
      )}
    </div>
  );
};

export default App;
