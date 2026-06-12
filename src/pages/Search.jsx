import { useState } from "react";
import { useMovieSearchContext } from "../context/MovieSearchContext";
import MovieCard from "../components/card/MovieCard";
import MovieModal from "../components/modal/MovieModal";
import { useDisclosure } from "@nextui-org/react";

const Search = () => {
  const { searchedMovies } = useMovieSearchContext();
  const [selectedMovie, setSelectedMovie] = useState({});

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClick = (movie) => {
    setSelectedMovie(movie);
    onOpen();
  };
  return (
    <section className="min-h-[1011px]">
      <MovieModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedMovie={selectedMovie}
      />
      <div className="p-8">
        Search Works!!
        {searchedMovies.results && (
          <div className="flex flex-wrap gap-3">
            {searchedMovies.results.map((movie) => {
              return (
                <div key={movie.id} onClick={() => handleClick(movie)}>
                  <MovieCard movie={movie} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
