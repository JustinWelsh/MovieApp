import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Image } from "@nextui-org/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp30 } from "../../_config/animations";
import { useWatchlistContext } from "../../context/WatchlistContext";

const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const OVERLAY_WIDTH = 420;

function MovieCard({ movie }) {
  const [hovered, setHovered] = useState(false);
  const [rect, setRect] = useState(null);
  const cardRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const { watchlist, addMovieToWatchlist, removeMovieFromWatchlist } =
    useWatchlistContext();

      const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
        : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

      const movieDetails = {
        title: movie.title || movie.name,
        release_year: (movie.release_date || movie.first_air_date || "").split(
          "-",
        )[0],
        rating: movie.vote_average ? movie.vote_average.toFixed(1) : null,
        genres: (movie.genre_ids || [])
          .slice(0, 3)
          .map((id) => GENRE_MAP[id])
          .filter(Boolean),
        poster_URL: posterUrl,
        backdrop_URL: movie.backdrop_path
          ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
          : posterUrl,
        is_in_watchlist: watchlist.some((m) => m.id === movie.id),
      };
      const {
        title,
        release_year,
        rating,
        genres,
        poster_URL,
        backdrop_URL,
        is_in_watchlist,
      } = movieDetails;




  useEffect(() => {
    const dismissOnScroll = () => {
      clearTimeout(hoverTimeoutRef.current);
      setHovered(false);
    };
    window.addEventListener("scroll", dismissOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", dismissOnScroll);
  }, []);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      if (cardRef.current) {
        setRect(cardRef.current.getBoundingClientRect());
      }
      setHovered(true);
    }, 400);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setHovered(false);
  };

  const toggleWatchlist = (e) => {
    e.stopPropagation();
    if (is_in_watchlist) {
      removeMovieFromWatchlist(movie.id);
    } else {
      addMovieToWatchlist(movie);
    }
  };

  const overlayStyle = rect
    ? {
        position: "fixed",
        top: rect.top,
        left: Math.max(
          8,
          Math.min(
            rect.left + rect.width / 2 - OVERLAY_WIDTH / 2,
            window.innerWidth - OVERLAY_WIDTH - 8,
          ),
        ),
        width: OVERLAY_WIDTH,
        zIndex: 9999,
      }
    : {};

  return (
    <>
      <motion.div
        ref={cardRef}
        {...fadeInUp30}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image width={200} alt={title} src={poster_URL} />
      </motion.div>

      {ReactDOM.createPortal(
        <AnimatePresence>
          {hovered && rect && (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.15 }}
              style={overlayStyle}
              onMouseEnter={() => {
                clearTimeout(hoverTimeoutRef.current);
                setHovered(true);
              }}
              onMouseLeave={handleMouseLeave}
              className="rounded-xl overflow-hidden shadow-2xl bg-zinc-900 cursor-pointer"
            >
              <img
                src={backdrop_URL}
                alt={title}
                className="w-full object-cover"
                style={{ aspectRatio: "16/9" }}
              />

              <div className="p-3 flex flex-col gap-2">
                <p className="text-white font-bold text-sm">{title}</p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleWatchlist}
                    className="flex items-center gap-1 bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {is_in_watchlist ? "✓ Watchlist" : "+ Watchlist"}
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-full border border-zinc-600 text-zinc-300 hover:border-white hover:text-white transition-colors text-sm"
                  >
                    👍
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  {rating && (
                    <span className="text-green-400 font-semibold">
                      ★ {rating}
                    </span>
                  )}
                  {release_year && <span>{release_year}</span>}
                  <span className="border border-zinc-600 px-1 text-[10px] rounded">
                    HD
                  </span>
                </div>

                {genres.length > 0 && (
                  <div className="flex flex-wrap gap-1 text-xs text-zinc-400">
                    {genres.map((genre, i) => (
                      <React.Fragment key={genre}>
                        {i > 0 && <span className="text-zinc-600">·</span>}
                        <span>{genre}</span>
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

export default MovieCard;
