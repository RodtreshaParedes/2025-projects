import { Movie } from "@/typings";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}

function Row({ title, movies }: Props) {
  return (
    <div className="h-52 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-gray-800 transition duration-200 hover:text-neutral-600 md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <MdArrowBackIos
          size={40}
          className="absolute bottom-0 left-2 top-0 z-40 m-auto cursor-pointer text-white opacity-0 transition hover:scale-125 group-hover:opacity-100"
        />

        <div className="scrollbar-hide flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2">
          {/* Thumbnail */}
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <MdArrowForwardIos
          size={40}
          className="absolute bottom-0 left-2 top-0 z-40 m-auto cursor-pointer text-white opacity-0 transition hover:scale-125 group-hover:opacity-100"
        />
      </div>
    </div>
  );
}

export default Row;
