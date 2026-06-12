import { useEffect, useState } from "react";
import { fetchPopular, fetchTrending } from "../services/MovieService";

const useHomeData = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return { popularMovies, popularTV, trendingMovies, trendingTV, loading };
};

export default useHomeData;
