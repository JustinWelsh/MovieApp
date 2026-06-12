import { useState } from "react";
import { useWatchlistContext } from "../context/WatchlistContext";
import { motion } from "framer-motion";
import MovieModal from "../components/modal/MovieModal";
import { useDisclosure } from "@nextui-org/react";
import MovieCarousel from "../components/carousel/MovieCarousel";

const Watchlist = () => {
  const { watchlist } = useWatchlistContext();
  const [selectedMovie, setSelectedMovie] = useState({});

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClick = (movie) => {
    setSelectedMovie(movie);
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
