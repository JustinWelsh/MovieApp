import React, { useEffect, useState } from "react";
import { Modal, ModalContent } from "@nextui-org/react";
import { motion } from "framer-motion";
import { BiMoviePlay } from "react-icons/bi";
import { useWatchlistContext } from "../../context/WatchlistContext";
import { fetchDetails, fetchTrailer } from "../../services/MovieService";
import { fadeInUp10 } from "../../_config/animations";

function MovieModal({ isOpen, onOpenChange, selectedMovie }) {
  const [trailer, setTrailer] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const { id, backdrop_path, poster_path, media_type } = selectedMovie;

  useEffect(() => {
    if (!isOpen) {
      setShowTrailer(false);
      return;
    }

    setTrailer(null);
    setMovieDetails(null);

    const fetchData = async () => {
      try {
        const [trailerData, detailsData] = await Promise.all([
          fetchTrailer(media_type, id),
          fetchDetails(media_type, id),
        ]);
        setTrailer(trailerData);
        setMovieDetails(detailsData);
      } catch (error) {
        console.error("Error fetching modal data:", error);
      }
    };

    fetchData();
  }, [isOpen, id, media_type]);

  const backdropUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${backdrop_path}`
    : poster_path
      ? `https://image.tmdb.org/t/p/w780${poster_path}`
      : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      classNames={{ base: "bg-zinc-900" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {showTrailer ? (
              <iframe
                className="rounded-xl"
                width="100%"
                height="450"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Movie Trailer"
                style={{ border: 0 }}
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={backdropUrl}
                  alt=""
                  className="w-full object-cover rounded-t-xl"
                  style={{ aspectRatio: "16/9" }}
                />
              </>
            )}
            {movieDetails ? (
              <MovieDetails
                selectedMovie={selectedMovie}
                movieDetails={movieDetails}
                trailer={trailer}
                setShowTrailer={setShowTrailer}
                onClose={onClose}
              />
            ) : null}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

const MovieDetails = ({
  selectedMovie,
  movieDetails,
  trailer,
  setShowTrailer,
  onClose,
}) => {
  const { addMovieToWatchlist, removeMovieFromWatchlist, isMovieInWatchlist } =
    useWatchlistContext();

    const { vote_average, id, genres, runtime, overview, tagline } =
      movieDetails;

  const title = movieDetails.title || movieDetails.name;
  const releaseDate = movieDetails.release_date || movieDetails.first_air_date;
  const rating = vote_average ? vote_average.toFixed(1) : null;
  const releaseYear = releaseDate?.split("-")[0];
  const isInWatchlist = isMovieInWatchlist(id);

  const runTime = runtime
    ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
    : null;

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      removeMovieFromWatchlist(selectedMovie.id);
    } else {
      addMovieToWatchlist(selectedMovie);
    }
  };

  return (
    <div className="p-5 flex flex-col gap-3 text-white">
      <p className="font-bold text-lg">{title}</p>

      <div className="flex items-center gap-2 text-xs text-zinc-400">
        {rating && (
          <span className="text-green-400 font-semibold">★ {rating}</span>
        )}
        {releaseYear && <span>{releaseYear}</span>}
        {runTime && <span>{runTime}</span>}
        <span className="border border-zinc-600 px-1 text-[10px] rounded">
          HD
        </span>
      </div>

      {genres.length > 0 && (
        <div className="flex flex-wrap gap-1 text-xs text-zinc-400">
          {genres.map((genre, i) => (
            <React.Fragment key={genre.id}>
              {i > 0 && <span className="text-zinc-600">·</span>}
              <span>{genre.name}</span>
            </React.Fragment>
          ))}
        </div>
      )}

      {tagline && (
        <p className="text-sm text-zinc-400 leading-relaxed italic">
          {tagline}
        </p>
      )}

      {overview && (
        <p className="text-sm text-zinc-300 leading-relaxed">{overview}</p>
      )}

      <div className="flex items-center gap-2 mt-1">
        <button
          onClick={toggleWatchlist}
          className="flex items-center gap-1 bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
        >
          {isInWatchlist ? "✓ Watchlist" : "+ Watchlist"}
        </button>
        {trailer && (
          <motion.button
            {...fadeInUp10}
            onClick={() => setShowTrailer(true)}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border border-zinc-600 text-zinc-300 hover:border-white hover:text-white transition-colors"
          >
            <BiMoviePlay />
            Play Trailer
          </motion.button>
        )}
        <button
          onClick={onClose}
          className="ml-auto text-xs text-zinc-500 hover:text-white transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MovieModal;
