import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = (props) => {
  const [movieTitle, setMovieTitle] = useState(""); //input from the user
  const baseUrl = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}`;

  const handleSubmit = (e) => {
    e.preventDefault()
    if (movieTitle) {
      fetch(`${baseUrl}&type=movie&s=${movieTitle}&page=1`)
        .then((res) => res.json())
        .then((data) => {
          props.setApiData(data);
        });
      setMovieTitle('')
    }
  };
  const handleInputChange = (e) => {
    setMovieTitle(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar w-1/2">
        <form 
        onSubmit={handleSubmit}
        className="flex"
        >
          <div className="self-center"><AiOutlineSearch /></div>
          <input
            type="search"
            id="movie-input"
            placeholder="Search for a movie"
            className="search-input w-2/3 bg-white rounded-none rounded-l-lg"
            name="movie-input"
            onChange={handleInputChange}
          ></input>
          <button
            type="submit"
            // disabled={movieTitle ? false : true}
            className="search-btn btn btn-primary w-1/3 rounded-none rounded-r-lg"
          >
            Search
          </button>

        </form>
      </div>
    </div>
  );
};

export default SearchBar;
