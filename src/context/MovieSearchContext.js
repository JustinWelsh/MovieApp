import { createContext, useContext, useState, useCallback } from "react";

const MovieSearchContext = createContext(null);

const MovieSearchProvider = ({ children }) => {
  const [searchedMovies, setSearchedMovies] = useState({});
  const [selectedMovie, setSelectedMovie] = useState({});

  const updateSearchedMovies = useCallback((obj) => {
    setSearchedMovies(obj);
  }, []);
  const updateSelectedMovie = useCallback((obj) => {
    setSelectedMovie(obj);
  }, []);

  return (
    <MovieSearchContext.Provider
      value={{
        searchedMovies,
        updateSearchedMovies,
        selectedMovie,
        updateSelectedMovie,
      }}
    >
      {children}
    </MovieSearchContext.Provider>
  );
};

const useMovieSearchContext = () => useContext(MovieSearchContext);

export { MovieSearchProvider, MovieSearchContext, useMovieSearchContext };
