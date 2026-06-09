import React, { useEffect, useState } from "react";
import { Modal, ModalContent } from "@nextui-org/react";
import { motion } from "framer-motion";
import { BiMoviePlay } from "react-icons/bi";
import { useWatchlistContext } from "../../context/WatchlistContext";
import { fetchTrailer } from "../../services/MovieService";
import { fadeInUp10 } from "../../_config/animations";

function MovieModal({ isOpen, onOpenChange, selectedMovie }) {
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const { id, backdrop_path, poster_path } = selectedMovie;

  useEffect(() => {
    if (!isOpen) {
      setShowTrailer(false);
      return;
    }

    setTrailer(null);

    const fetchData = async () => {
      try {
        const trailerData = await fetchTrailer(id);
        setTrailer(trailerData);
      } catch (error) {
        console.error("Error Fetching Trailer Data:", error);
      }
    };

    fetchData();
  }, [isOpen, id]);

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
        {(onClose) =>
          showTrailer ? (
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
              <MovieDetails
                selectedMovie={selectedMovie}
                trailer={trailer}
                setShowTrailer={setShowTrailer}
                onClose={onClose}
              />
            </>
          )
        }
      </ModalContent>
    </Modal>
  );
}

const MovieDetails = ({ selectedMovie, trailer, setShowTrailer, onClose }) => {
  const {
    id,
    title,
    name,
    release_date,
    first_air_date,
    overview,
    vote_average,
    genre_ids,
  } = selectedMovie;
  const { watchlist, addMovieToWatchlist, removeMovieFromWatchlist } =
    useWatchlistContext();

  const displayTitle = title || name;
  const date = release_date || first_air_date;
  const rating = vote_average ? vote_average.toFixed(1) : null;
  const release_year = (date || "").split("-")[0];
  const isInWatchlist = watchlist.some((m) => m.id === id);

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      removeMovieFromWatchlist(id);
    } else {
      addMovieToWatchlist(selectedMovie);
    }
  };

  return (
    <div className="p-5 flex flex-col gap-3 text-white">
      <p className="font-bold text-lg">{displayTitle}</p>

      <div className="flex items-center gap-2 text-xs text-zinc-400">
        {rating && (
          <span className="text-green-400 font-semibold">★ {rating}</span>
        )}
        {release_year && <span>{release_year}</span>}
        <span className="border border-zinc-600 px-1 text-[10px] rounded">
          HD
        </span>
      </div>

      {genre_ids.length > 0 && (
        <div className="flex flex-wrap gap-1 text-xs text-zinc-400">
          {/* {genres.map((genre, i) => (
            <React.Fragment key={genre}>
              {i > 0 && <span className="text-zinc-600">·</span>}
              <span>{genre}</span>
            </React.Fragment>
          ))} */}
        </div>
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
