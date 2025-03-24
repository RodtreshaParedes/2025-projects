import MuiModal from "@mui/material/Modal";
import {useModal} from "@/context/ModalContext";
import {XIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {Element, Genre, MovieDetails} from "@/typings";
import ReactPlayer from "react-player/lazy";
import {CiPlay1} from "react-icons/ci";
import {LuPlus} from "react-icons/lu";
import {IoMdVolumeOff} from "react-icons/io";
import {MdVolumeUp} from "react-icons/md";

function Modal() {
    const {showModal, setShowModal, currentMovie} = useModal(); // Get movie from context
    const [movieData, setMovieData] = useState<MovieDetails | null>(null);
    const [trailer, setTrailer] = useState("");
    const [genres, setGenres] = useState<Genre[]>([]);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        if (!currentMovie) return;

        async function fetchMovie() {
            try {
                const mediaType = currentMovie?.media_type || (currentMovie?.title ? "movie" : "tv"); // Default to 'tv' if no title
                const url = `https://api.themoviedb.org/3/${mediaType}/${currentMovie?.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos`;

                console.log("Fetching Movie URL:", url);

                const response = await fetch(url);
                if (!response.ok) {
                    console.warn("Failed to fetch movie data:", response.status, response.statusText);
                    setMovieData(null);
                    return;
                }

                const data = await response.json();
                console.log("TMDB API Response:", data);

                setMovieData(data);
                setGenres(data?.genres || []);

                // Filter trailers based on correct title matching
                if (data?.videos?.results.length > 0) {
                    const filteredVideos = data.videos.results.filter(
                        (video: Element) =>
                            video.site === "YouTube" &&
                            (video.type === "Trailer" || video.type === "Teaser" || video.type === "Clip")
                    );

                    const selectedVideo =
                        filteredVideos.find((video: Element) => video.official && video.type === "Trailer") ||
                        filteredVideos.find((video: Element) => video.type === "Trailer") ||
                        filteredVideos.find((video: Element) => video.official && video.type === "Teaser") ||
                        filteredVideos.find((video: Element) => video.type === "Teaser") ||
                        filteredVideos.find((video: Element) => video.official && video.type === "Clip") ||
                        filteredVideos.find((video: Element) => video.type === "Clip") ||
                        filteredVideos[0]; // Fallback to the first available video

                    setTrailer(selectedVideo?.key || "");
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

    // Correct Runtime Handling
    const runtime =
        movieData?.runtime ||
        (Array.isArray(movieData?.episode_run_time) ? movieData?.episode_run_time[0] : "N/A");

    // Correct Vote Average Formatting
    const voteAverage = movieData?.vote_average ? `${(movieData.vote_average * 10).toFixed(1)}% Match` : "N/A";

    // Correct Release Date Handling
    const releaseDate = movieData?.release_date || movieData?.first_air_date || "Unknown";

    return (
        <MuiModal
            open={showModal}
            onClose={handleClose}
            className="fixed !top-7 left-0 !bottom-6 right-0 z-50 mx-auto w-full max-w-5xl overflow-y-scroll rounded-md scrollbar-hide"
        >
            <>
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#a1a1a181] hover:bg-[#a1a1a181]"
                >
                    <XIcon className="h-6 w-6 text-white cursor-pointer"/>
                </button>

                {/* Video Section */}
                <div className="relative pt-[56.25%]">
                    {trailer ? (
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${trailer}`}
                            width="100%"
                            height="100%"
                            style={{position: "absolute", top: 0, left: 0}}
                            playing
                            muted={muted}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-black text-white text-lg">
                            No Video Available
                        </div>
                    )}

                    {/* Controls */}
                    <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                        <div className="flex space-x-2">
                            <button
                                className="flex items-center gap-x-4 rounded bg-[#000000b7] px-8 text-xl font-light text-white transition hover:bg-gray-700"
                            >
                                <CiPlay1 className="h-7 w-7 text-white"/>
                                Play
                            </button>

                            <button className="modalButton">
                                <LuPlus className="h-7 w-7 text-white"/>
                            </button>
                        </div>

                        <button className="modalButton" onClick={() => setMuted(!muted)}>
                            {muted ? (
                                <IoMdVolumeOff className="h-6 w-6 text-white"/>
                            ) : (
                                <MdVolumeUp className="h-6 w-6 text-white"/>
                            )}
                        </button>
                    </div>
                </div>

                {/* Movie Details */}
                <div className="flex space-x-16 rounded-b-md bg-white/10 backdrop-blur-lg px-10 py-8">
                    <div className="space-y-6 text-lg">
                        <div className="flex items-center space-x-2 text-sm text-white">
                            {/* Vote Average */}
                            <p className="font-semibold text-green-400">{voteAverage}</p>

                            {/* Release Date */}
                            <p className="font-light">{releaseDate}</p>

                            {/* Runtime */}
                            {runtime !== "N/A" && (
                                <div
                                    className="flex h-4 font-bold items-center justify-center rounded border border-white/40 px-1.5 text-xs text-white">
                                    {`${runtime} min`}
                                </div>
                            )}
                        </div>

                        {/* Movie Description */}
                        <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row text-white mt-3">
                            <p className="w-5/6">{movieData?.overview || "No description available."}</p>
                            <div className="flex flex-col space-y-3 text-sm">
                                <div>
                                    <span className="text-gray-400">Genres: </span>
                                    {genres.map((genre) => genre.name).join(", ")}
                                </div>

                                <div>
                                    <span className="text-gray-400">Original Language: </span>
                                    {movieData?.original_language}
                                </div>

                                <div>
                                    <span className="text-gray-400">Total Votes: </span>
                                    {movieData?.vote_count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    );
}

export default Modal;
