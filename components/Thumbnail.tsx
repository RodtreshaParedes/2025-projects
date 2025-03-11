import { Movie } from "@/typings";
import Image from "next/image";

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  return (
    <div className="h-30 relative min-w-[190px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      {/* Movie Image */}
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        alt={movie.title || movie.name || "Movie Thumbnail"}
      />

      {/* Movie Title (Bottom Left) */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2">
        <p className="text-xs font-semibold text-white md:text-sm">
          {movie.title || movie.name}
        </p>
      </div>
    </div>
  );
}

export default Thumbnail;
