import {Movie} from "@/typings";
import Image from "next/image";
import {useModal} from "@/context/ModalContext";

interface Props {
    // DocumentData for when using Firebase
    // movie: Movie | DocumentData;
    movie: Movie;
}

function Thumbnail({movie}: Props) {
    const {setShowModal, setCurrentMovie} = useModal();

    return (
        <div
            className="h-30 relative min-w-[165px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[213.8px] md:hover:scale-105"
            onClick={() => {
                setCurrentMovie(movie)
                setShowModal(true)
            }}
        >
            {/* Movie Image */}
            <Image
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                className="rounded-sm object-cover md:rounded"
                layout="fill"
                alt={movie.title || movie.name || "Movie Thumbnail"}
            />

            {/* Movie Title (Bottom Left) */}
            <div className="thumbnail-name absolute bottom-0 left-0 w-full rounded p-2">
                <p className="text-xs font-semibold text-white md:text-sm">
                    {movie.title || movie.name}
                </p>
            </div>
        </div>
    );
}

export default Thumbnail;
