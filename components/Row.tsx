import {useState, useEffect, useRef} from "react";
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
import Thumbnail from "./Thumbnail";
import {motion} from "framer-motion";
import {Movie} from "@/typings";

interface Props {
    title: string;
    movies: Movie[];
}

function Row({title, movies}: Props) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const [animationTrigger, setAnimationTrigger] = useState(0);
    // Set default scroll count to 6 for larger screens.
    const [thumbnailsPerScroll, setThumbnailsPerScroll] = useState(6);

    // Update thumbnailsPerScroll based on screen size.
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const updateThumbnailsPerScroll = () => {
            setThumbnailsPerScroll(mediaQuery.matches ? 3 : 6);
        };
        updateThumbnailsPerScroll();
        mediaQuery.addEventListener("change", updateThumbnailsPerScroll);
        return () => {
            mediaQuery.removeEventListener("change", updateThumbnailsPerScroll);
        };
    }, []);

    const handleClick = (direction: string) => {
        if (!rowRef.current) return;

        const thumbnailElement = rowRef.current.querySelector("div.relative");

        // Ensure thumbnailWidth is a valid number
        let thumbnailWidth = thumbnailElement?.clientWidth || 0;

        // Fallback: if thumbnailWidth is still 0, use a default value
        if (thumbnailWidth === 0) {
            thumbnailWidth = rowRef.current.clientWidth / thumbnailsPerScroll || 100; // Default width
        }

        const scrollAmount = thumbnailWidth * thumbnailsPerScroll;
        if (isNaN(scrollAmount)) return; // Prevent invalid scroll values

        const {scrollLeft} = rowRef.current;
        const scrollTo =
            direction === "left"
                ? scrollLeft - scrollAmount
                : scrollLeft + scrollAmount;

        rowRef.current.scrollTo({left: scrollTo, behavior: "smooth"});
        setAnimationTrigger((prev) => prev + 1);
    };

    useEffect(() => {
        const scrollElement = rowRef.current;
        if (!scrollElement) return;

        const handleScroll = () => {
            setIsMoved(scrollElement.scrollLeft > 0);
            setIsEnd(
                scrollElement.scrollLeft + scrollElement.clientWidth + 10 >=
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
        default: {rotateY: 0, opacity: 1, transformOrigin: "center"},
        rotate: (index: number) => ({
            rotateY: [0, 30, 0],
            opacity: [1, 0, 1],
            transformOrigin: "center",
            transition: {delay: index * 0.03, duration: 0.9, ease: "easeInOut"},
        }),
    };

    return (
        <div className="h-50 group md:h-60">
            <h2 className="w-56 cursor-pointer text-sm font-semibold text-gray-800 transition duration-200 hover:text-neutral-600 md:text-2xl">
                {title}
            </h2>

            <div className="relative overflow-hidden md:-ml-10">
                {isMoved && (
                    <MdArrowBackIos
                        size={40}
                        className="absolute left-0 top-1/2 z-40 -translate-y-1/2 cursor-pointer rounded-full bg-white/30 p-2 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 group-hover:opacity-100"
                        onClick={() => handleClick("left")}
                    />
                )}

                <div
                    ref={rowRef}
                    className="scrollbar-hide -px-2 flex items-center overflow-x-scroll md:px-10"
                >
                    {movies.map((movie, index) => (
                        <motion.div
                            key={`${movie.id}-${animationTrigger}`}
                            custom={index}
                            variants={thumbnailVariants}
                            initial="default"
                            animate="rotate"
                            className="relative px-1 py-4"
                            onAnimationComplete={() => {
                                if (rowRef.current) {
                                    setIsMoved(rowRef.current.scrollLeft > 0);
                                    setIsEnd(
                                        rowRef.current.scrollLeft + rowRef.current.clientWidth + 10 >=
                                        rowRef.current.scrollWidth
                                    );
                                }
                            }}
                        >
                            <Thumbnail movie={movie}/>
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
