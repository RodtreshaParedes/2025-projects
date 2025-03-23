import MuiModal from "@mui/material/Modal";
import {useModal} from "@/context/ModalContext";
import {XIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {Element, Genre} from "@/typings"
import ReactPlayer from "react-player/lazy";
import {CiPlay1} from "react-icons/ci";

function Modal() {
    const {showModal, setShowModal, currentMovie} = useModal(); // Get movie from context
    const [movieData, setMovieData] = useState(null);
    const [trailer, setTrailer] = useState("");
    const [genres, setGenres] = useState<Genre[]>([])
    const [muted, setMuted] = useState(false)

    useEffect(() => {
        if (!currentMovie) return; // Ensure we have a movie selected

        async function fetchMovie() {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/${currentMovie?.media_type === 'tv' ? 'tv' : 'movie'}/${currentMovie?.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos`
                );

                if (!response.ok) throw new Error("Failed to fetch movie data");

                const data = await response.json();
                setMovieData(data); // Store fetched data in state
                console.log("Fetched Movie Data:", data);

                if (data?.videos) {
                    const index = data.videos.results.findIndex((element: Element) => element.type === "Trailer")
                    setTrailer(data.videos?.results[index]?.key);
                }
                if (data?.genres) {
                    setGenres(data.genres)
                }
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        }

        fetchMovie();
    }, [currentMovie]);

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <MuiModal open={showModal} onClose={handleClose}
                  className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-y-scroll">
            <>
                <button onClick={handleClose}
                        className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#a1a1a181] hover:bg-[#a1a1a181]">
                    <XIcon className="h-6 w-6 text-white cursor-pointer"/>
                </button>

                <div className="relative pt-[56.25%]">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width="100%"
                        height="100%"
                        style={{position: 'absolute', top: '0', left: '0'}}
                        playing
                        muted={muted}
                    />
                </div>

                <div>
                    <button className="flex items-center gap-x-4 rounded">
                        <CiPlay1 className="h-7 w-7 text-white"/>
                        Play
                    </button>
                </div>
            </>
        </MuiModal>
    );
}

export default Modal;
