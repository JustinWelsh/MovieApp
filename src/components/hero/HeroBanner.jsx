import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { BsPlayFill, BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { BiInfoCircle } from "react-icons/bi";
import { fadeInUp30 } from "../../_config/animations";

/**
 * @typedef {Object} HeroBannerProps
 * @property {Object} movie - TMDB movie or TV object
 * @property {Function} onMoreInfo - Called with `movie` when "More Info" is clicked
 * @property {Function} [onPlay] - Called when "Play" is clicked
 */

/** @param {HeroBannerProps} props */
const HeroBanner = ({ movie, onMoreInfo, onPlay }) => {
  if (!movie) return null;

  const { title, name, overview, backdrop_path, release_date, first_air_date, vote_average } = movie;

  const displayTitle = title || name;
  const year = (release_date || first_air_date)?.slice(0, 4);
  const backdropUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;
  const truncatedOverview = overview?.length > 180 ? overview.slice(0, 180) + "..." : overview;

  return (
    <div className="relative w-full bg-black" style={{ height: "85vh" }}>
      {/* Backdrop image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />

      {/* Left vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
      {/* Bottom fade to page background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 px-12 pb-28 max-w-lg">
        <motion.div {...fadeInUp30}>
          <span className="text-xs font-bold tracking-widest text-red-500 uppercase mb-4 block">
            Now Featured
          </span>

          <h1 className="text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            {displayTitle}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
            {vote_average != null && <StarRating rating={vote_average / 2} />}
            {year && <span>{year}</span>}
          </div>

          <p className="text-gray-200 text-sm leading-relaxed mb-6">
            {truncatedOverview}
          </p>

          <div className="flex gap-3">
            <Button
              className="bg-white text-black font-semibold px-6 min-w-[100px]"
              startContent={<BsPlayFill className="text-base" />}
              radius="sm"
              onPress={onPlay}
            >
              Play
            </Button>
            <Button
              className="bg-white/20 text-white font-semibold px-6 min-w-[120px] backdrop-blur-sm border-white/20"
              variant="bordered"
              startContent={<BiInfoCircle className="text-base" />}
              radius="sm"
              onPress={() => onMoreInfo(movie)}
            >
              More Info
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/** @param {{ rating: number }} props — rating is 0–5 */
const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.4;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5 text-yellow-400">
      {Array.from({ length: full }).map((_, i) => (
        <BsStarFill key={`f${i}`} className="text-xs" />
      ))}
      {half && <BsStarHalf key="h" className="text-xs" />}
      {Array.from({ length: empty }).map((_, i) => (
        <BsStar key={`e${i}`} className="text-xs text-gray-500" />
      ))}
      <span className="ml-1 text-gray-300">{(rating * 2).toFixed(1)}</span>
    </div>
  );
};

export default HeroBanner;
