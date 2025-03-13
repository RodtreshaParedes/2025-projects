import { Movie } from "@/typings";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Thumbnail from "./Thumbnail";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  movies: Movie[];
}

function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(0);

  const handleClick = (direction: string) => {
    if (!rowRef.current) return;

    const { scrollLeft, clientWidth } = rowRef.current;
    const scrollTo =
      direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;

    rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });

    setAnimationTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const scrollElement = rowRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      setIsMoved(scrollElement.scrollLeft > 0);
      setIsEnd(
        scrollElement.scrollLeft + scrollElement.clientWidth + 10 >= // Added buffer
          scrollElement.scrollWidth,
      );
    };

    scrollElement.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const thumbnailVariants = {
    default: { rotateY: 0, opacity: 1, transformOrigin: "center" },
    rotate: (index: number) => ({
      rotateY: [0, 30, 0], //Reduced rotation amount
      opacity: [1, 0, 1],
      transformOrigin: "center",
      transition: { delay: index * 0.03, duration: 0.5, ease: "easeInOut" },
      onComplete: () => {
        if (rowRef.current) {
          setIsMoved(rowRef.current.scrollLeft > 0);
          setIsEnd(
            rowRef.current.scrollLeft + rowRef.current.clientWidth + 10 >=
              rowRef.current.scrollWidth,
          );
        }
      },
    }),
  };

  return (
    <div className="group h-52 space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-gray-800 transition duration-200 hover:text-neutral-600 md:text-2xl">
        {title}
      </h2>

      <div className="relative overflow-hidden md:-ml-2">
        {isMoved && (
          <MdArrowBackIos
            size={40}
            className="absolute left-0 top-1/2 z-40 -translate-y-1/2 cursor-pointer rounded-full bg-white/30 p-2 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 group-hover:opacity-100"
            onClick={() => handleClick("left")}
          />
        )}

        <div
          ref={rowRef}
          className="scrollbar-hide flex items-center gap-x-4 overflow-x-scroll px-4 md:p-2 md:px-6"
        >
          {movies.map((movie, index) => (
            <motion.div
              key={`${movie.id}-${animationTrigger}`}
              custom={index}
              variants={thumbnailVariants}
              initial="default"
              animate="rotate"
              className="relative"
            >
              <Thumbnail movie={movie} />
            </motion.div>
          ))}
        </div>

        {!isEnd && (
          <MdArrowForwardIos
            size={40}
            className="absolute right-0 top-1/2 z-40 -translate-y-1/2 cursor-pointer rounded-full bg-white/30 p-2 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 group-hover:opacity-100"
            onClick={() => handleClick("right")}
          />
        )}
      </div>
    </div>
  );
}

export default Row;
