import { Movie } from '@/typings';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import Thumbnail from './Thumbnail';

interface Props {
  title: string;
  movies: Movie[];
}

function Row({ title, movies }: Props) {
  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-gray-800 transition duration-200 hover:text-neutral-600 md:text-2xl">
        {title}
      </h2>
      <div className="flex relative gap-4 group md:-ml-2">
        <span className="p-2 bg-gray-400/35 rounded-full text-white opacity-0 transition hover:scale-125 group-hover:opacity-100 flex items-center justify-center">
          <MdArrowBackIos size={20} />
        </span>

        <div>
          {/* Thumbnail */}
          <Thumbnail />
        </div>

        <span className="p-2 bg-gray-400/35 rounded-full text-white opacity-0 transition hover:scale-125 group-hover:opacity-100 flex items-center justify-center">
          <MdArrowForwardIos size={20} />
        </span>
      </div>
    </div>
  );
}

export default Row;
