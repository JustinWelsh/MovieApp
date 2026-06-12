import { createContext, useContext, useState, useCallback } from "react";

const MovieSearchContext = createContext(null);

const MovieSearchProvider = ({ children }) => {
  const [searchedMovies, setSearchedMovies] = useState({});

  const updateSearchedMovies = useCallback((obj) => {
    setSearchedMovies(obj);
  }, []);

  return (
    <MovieSearchContext.Provider
      value={{
        searchedMovies,
        updateSearchedMovies,
      }}
    >
      {children}
    </MovieSearchContext.Provider>
  );
};

const useMovieSearchContext = () => useContext(MovieSearchContext);

export { MovieSearchProvider, MovieSearchContext, useMovieSearchContext };
