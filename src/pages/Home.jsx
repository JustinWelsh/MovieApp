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

  const carouselConfig = [
    { id: "trending-movies", title: "Trending Movies", movies: trendingMovies },
    { id: "trending-tv", title: "Trending TV Shows", movies: trendingTV },
    { id: "popular-movies", title: "Popular Movies", movies: popularMovies },
    { id: "popular-tv", title: "Popular TV Shows", movies: popularTV },
  ];

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
          {carouselConfig.map(({ id, title, movies }) => (
            <motion.div {...fadeInUp30} id={id} key={id}>
              <h2 className="text-white text-xl p-3 font-bold">{title}</h2>
              {loading ? (
                <SkeletonCards />
              ) : (
                <MovieCarousel
                  movies={movies}
                  handleMovieClick={handleMovieClick}
                />
              )}
            </motion.div>
          ))}
          <hr />
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
