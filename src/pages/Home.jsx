import React, { useEffect, useState } from "react";
import { NextUIProvider, Skeleton } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { motion } from "framer-motion";
import { fetchPopular, fetchTrending } from "../services/MovieService";
import MovieCarousel from "../components/carousel/MovieCarousel";
import MovieModal from "../components/modal/MovieModal";
import HeroBanner from "../components/hero/HeroBanner";
import { fadeInUp30 } from "../_config/animations";

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const [popularMoviesData, trendingMoviesData] = await Promise.all([
          fetchPopular("movie"),
          fetchTrending("movie"),
        ]);
        setPopularMovies(popularMoviesData);
        setTrendingMovies(trendingMoviesData);
      } catch (error) {
        console.error("Error Fetching Movie Data:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchTvData = async () => {
      try {
        const [popularTVData, trendingTVData] = await Promise.all([
          fetchPopular("tv"),
          fetchTrending("tv"),
        ]);
        setPopularTV(popularTVData);
        setTrendingTV(trendingTVData);
      } catch (error) {
        console.error("Error Fetching TV Data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
    fetchTvData();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    onOpen();
  };


  return (
    <NextUIProvider>
      <MovieModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedMovie={selectedMovie}
      />
      <HeroBanner
        movie={trendingMovies[0]}
        onMoreInfo={handleMovieClick}
        onPlay={() => handleMovieClick(trendingMovies[0])}
      />
      <section className="">
        <div className="p-8">
          <motion.div {...fadeInUp30}>
            <h2 className="text-white text-xl p-3 font-bold">Popular Movies</h2>
            {loading ? (
              <SkeletonCards />
            ) : (
              <MovieCarousel
                movies={popularMovies}
                handleMovieClick={handleMovieClick}
              />
            )}
          </motion.div>
          <motion.div {...fadeInUp30}>
            <h2 className="text-white text-xl p-3 font-bold mt-8">
              Popular TV Shows
            </h2>
            {loading ? (
              <SkeletonCards />
            ) : (
              <MovieCarousel
                movies={popularTV}
                handleMovieClick={handleMovieClick}
              />
            )}
          </motion.div>
          <motion.div {...fadeInUp30}>
            <h2 className="text-white text-xl p-3 font-bold mt-8">
              Trending Movies
            </h2>
            {loading ? (
              <SkeletonCards />
            ) : (
              <MovieCarousel
                movies={trendingMovies}
                handleMovieClick={handleMovieClick}
              />
            )}
          </motion.div>
          <motion.div {...fadeInUp30}>
            <h2 className="text-white text-xl p-3 font-bold mt-8">
              Trending TV Shows
            </h2>
            {loading ? (
              <SkeletonCards />
            ) : (
              <MovieCarousel
                movies={trendingTV}
                handleMovieClick={handleMovieClick}
              />
            )}
          </motion.div>
        </div>
      </section>
    </NextUIProvider>
  );
};

const SkeletonCards = () => (
  <div className="flex gap-4 pb-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <Skeleton
        key={i}
        className="rounded-lg flex-shrink-0"
        style={{ width: 200, height: 300 }}
      />
    ))}
  </div>
);

export default Home;
