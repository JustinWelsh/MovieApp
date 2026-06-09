import { useMovieSearchContext } from "../context/MovieSearchContext";
import MovieCard from "../components/card/MovieCard";
import MovieModal from "../components/modal/MovieModal";
import { useDisclosure } from "@nextui-org/react";

const Search = () => {
  const { searchedMovies } = useMovieSearchContext();
  const { selectedMovie, updateSelectedMovie } = useMovieSearchContext();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClick = (movie) => {
    updateSelectedMovie(movie);
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
