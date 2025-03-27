import MuiModal from "@mui/material/Modal";
import {useModal} from "@/context/ModalContext";
import {XIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {Element, Genre, Movie, MovieDetails} from "@/typings";
import ReactPlayer from "react-player/lazy";
import {CiPause1, CiPlay1} from "react-icons/ci";
import {LuCheck, LuPlus} from "react-icons/lu";
import {IoMdVolumeOff} from "react-icons/io";
import {MdVolumeUp} from "react-icons/md";
import useAuth from "@/hooks/useAuth";
import {deleteDoc, doc, setDoc} from "@firebase/firestore";
import {db} from "@/firebase";
import {toast, Toaster} from "react-hot-toast";
import {collection, DocumentData, onSnapshot} from "firebase/firestore";

function Modal() {
    const {showModal, setShowModal, currentMovie} = useModal(); // Get movie from context
    const [movieData, setMovieData] = useState<MovieDetails | null>(null);
    const [trailer, setTrailer] = useState("");
    const [genres, setGenres] = useState<Genre[]>([]);
    const [movies, setMovies] = useState<Movie[] | DocumentData[]>([])
    const [muted, setMuted] = useState(false);
    const [cast, setCast] = useState<{ name: string; character: string; profile_path: string | null }[]>([]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [addedToList, setAddedToList] = useState(false)
    const {user} = useAuth()

    useEffect(() => {
        if (!currentMovie) return;

        async function fetchMovie() {
            try {
                const mediaType = currentMovie?.media_type || (currentMovie?.title ? "movie" : "tv"); // Default to 'tv' if no title
                const url = `https://api.themoviedb.org/3/${mediaType}/${currentMovie?.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos,credits`;

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
                const castData = data?.credits?.cast || [];
                setCast(castData.slice(0, 10)); // Store only the first 10 cast members

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

    useEffect(() => {
        if (user) {
            return onSnapshot(collection(db, "users", user.uid, "myList"),
                (snapshot) => setMovies(snapshot.docs))
        }
    }, [db, currentMovie?.id]);

    useEffect(() => {
        if (currentMovie) {
            setAddedToList(movies.some((movie) => movie.data().id === currentMovie.id));
        }
    }, [movies, currentMovie]);

    const handleList = async () => {
        if (!user || !currentMovie) {
            console.error("User or currentMovie is missing!");
            return;
        }

        try {
            const movieRef = doc(db, "users", user.uid, "myList", currentMovie.id.toString());

            if (addedToList) {
                await deleteDoc(movieRef);
                setAddedToList(false); // Update state immediately
                toast(`${currentMovie.title || currentMovie.original_name} has been removed from My List`, {duration: 8000});
                console.log("Movie removed from My List");
            } else {
                await setDoc(movieRef, {...currentMovie});
                setAddedToList(true); // Update state immediately
                toast(`${currentMovie.title || currentMovie.original_name} has been added to My List`, {duration: 8000});
                console.log("Movie added to My List");
            }
        } catch (error) {
            console.error("Error updating My List:", error);
            toast("Something went wrong. Please try again.");
        }
    };

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
                <Toaster position="bottom-center"/>
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
                            playing={isPlaying} // Dynamically controls playback
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
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="flex items-center gap-x-4 rounded bg-[#000000b7] px-8 text-xl font-light text-white transition hover:bg-gray-700/40"
                            >
                                {isPlaying ? (
                                    <>
                                        <CiPause1 className="h-7 w-7 text-white"/> Pause
                                    </>
                                ) : (
                                    <>
                                        <CiPlay1 className="h-7 w-7 text-white"/> Play
                                    </>
                                )}
                            </button>

                            <button className="modalButton" onClick={handleList}>
                                {addedToList ? (
                                    <LuCheck className="h-7 w-7"/> // Check icon if in list
                                ) : (
                                    <LuPlus className="h-7 w-7"/> // Plus icon if not in list
                                )}
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
                            <p className="w-[420px] md:w-[650px]">{movieData?.overview || "No description available."}</p>
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

                        {/* Scrollable Cast Section */}
                        <div className="mt-6 max-w-[400px] md:max-w-[900px] mx-auto">
                            {/* Fixed Heading */}
                            <h3 className="text-lg font-semibold text-white mb-3">Top Cast</h3>

                            {/* Scrollable Cast List */}
                            <div className="relative w-full overflow-hidden">
                                <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x space-x-4 px-4 w-full max-w-full">
                                    {cast.map((member, index) => (
                                        <div key={index} className="flex flex-col items-center text-center min-w-[90px] snap-start">
                                            <img
                                                src={member.profile_path
                                                    ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                                                    : "/default-avatar.png"}
                                                alt={member.name}
                                                className="w-20 h-20 rounded-full object-cover border border-gray-600"
                                            />
                                            <p className="text-white text-sm mt-1">{member.name}</p>
                                            <p className="text-gray-400 text-xs">{member.character}</p>
                                        </div>
                                    ))}
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