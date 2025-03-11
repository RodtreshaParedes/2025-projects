import { baseUrl } from "@/constants/movie";
import { Movie } from "@/typings";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import { TfiInfoAlt } from "react-icons/tfi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import requests from "@/utils/requests";
import { motion } from "framer-motion";

interface Props {
  trending: Movie[];
}

const fetchSeasons = async (tvId: number) => {
  const res = await fetch(requests.fetchTVDetails(tvId));
  const data = await res.json();
  return data.number_of_seasons;
};

function Banner({ trending }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [seasons, setSeasons] = useState<number | null>(null);

  useEffect(() => {
    if (movie?.media_type === "tv") {
      fetchSeasons(movie.id).then(setSeasons);
    }
  }, [movie]);

  useEffect(() => {
    setMovie(trending[Math.floor(Math.random() * trending.length)]);
  }, [trending]);

  const truncateOverview = (text: string | undefined, maxLength: number) => {
    if (!text) return ""; // Handle null or undefined overview
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const getStarRating = (rating: number) => {
    const stars = [];
    const ratingOutOfFive = rating / 2; // Convert TMDB rating (0-10) to 5-star scale

    for (let i = 1; i <= 5; i++) {
      if (i <= ratingOutOfFive) {
        stars.push(<FaStar key={i} className="text-yellow-400" />); // Full star
      } else if (i - 0.5 <= ratingOutOfFive) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />); // Half star
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400" />); // Empty star
      }
    }

    return stars;
  };

  // Slide-in animation settings
  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div>
      {/* Background Image */}
      <div className="absolute left-0 top-0 h-[95vh] w-full">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt={`${movie?.title || movie?.name}`}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="absolute bottom-0 left-0 h-[500px] w-full bg-gradient-to-b from-transparent to-[#efeafb]"></div>
      </div>

      <motion.div
        className="text-shadow-md relative flex flex-col space-y-2 py-16 text-[#222222] md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12"
        initial="hidden"
        animate="visible"
        variants={slideInLeft}
      >
        {/* Movie Title */}
        <motion.h1
          className="relative z-10 text-2xl font-bold md:text-4xl lg:text-7xl"
          variants={slideInLeft}
        >
          {movie?.title || movie?.name}
        </motion.h1>

        {/* Buttons */}
        <motion.div
          className="relative z-10 flex gap-3 md:gap-4"
          variants={slideInLeft}
        >
          <button className="bannerButton gap-2 bg-black/60 hover:bg-black/40 md:gap-3">
            <span className="-ml-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-400/20 md:-ml-4 md:h-9 md:w-9">
              <CiPlay1 className="text-base text-white md:text-lg" />
            </span>
            Play Show
          </button>

          <button className="bannerButton gap-2 bg-gray-400/40 hover:bg-neutral-400/30 md:gap-4">
            <span className="-ml-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-400/30 md:-ml-5 md:h-9 md:w-9">
              <TfiInfoAlt className="text-base text-white md:text-lg" />
            </span>
            More Info
          </button>
        </motion.div>

        {/* Release Year, Seasons, and Rating */}
        <motion.div
          className="relative z-10 flex items-center gap-2 text-lg font-semibold text-white"
          variants={slideInLeft}
        >
          <span className="text-sm text-gray-300 md:text-base">
            {movie?.release_date?.slice(0, 4) ||
              movie?.first_air_date?.slice(0, 4)}{" "}
            | {seasons ? `${seasons} Seasons` : ""}
          </span>
          <div className="flex">{getStarRating(movie?.vote_average || 0)}</div>
        </motion.div>

        {/* Overview */}
        <motion.p
          className="text-shadow-md relative z-10 max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-lg lg:text-2xl"
          variants={slideInLeft}
        >
          {truncateOverview(movie?.overview, 150)}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Banner;
