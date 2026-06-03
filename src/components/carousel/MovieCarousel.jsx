import MovieCard from "../card/MovieCard";

function MovieCarousel({ movies, handleMovieClick }) {
  return (
    <div className="overflow-x-auto overflow-y-clip">
      <div className="flex gap-4 pb-4" style={{ width: "max-content" }}>
        {movies &&
          movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
              className="cursor-pointer flex-shrink-0"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default MovieCarousel;
