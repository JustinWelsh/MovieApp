import { useWatchlistContext } from "../context/WatchlistContext";
import { motion } from "framer-motion";
import MovieModal from "../components/modal/MovieModal";
import { useDisclosure } from "@nextui-org/react";
import MovieCarousel from "../components/carousel/MovieCarousel";
import { useMovieSearchContext } from "../context/MovieSearchContext";

const Watchlist = () => {
  const { watchlist } = useWatchlistContext();
  const { selectedMovie, updateSelectedMovie } = useMovieSearchContext();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClick = (movie) => {
    updateSelectedMovie(movie);
    onOpen();
  };

  return (
    <div className="min-h-[1011px]">
      Watchlist Page!!
      <MovieModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedMovie={selectedMovie}
      />
      <motion.div className="p-8">
        <MovieCarousel movies={watchlist} handleMovieClick={handleClick} />
      </motion.div>
    </div>
  );
};

export default Watchlist;
