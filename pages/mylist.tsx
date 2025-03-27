import {useEffect, useState} from "react";
import {Movie} from "@/typings";
import Thumbnail from "@/components/Thumbnail";
import useAuth from "@/hooks/useAuth";
import useList from "@/hooks/useList";
import {useModal} from "@/context/ModalContext";
import Modal from "@/components/Modal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

const Mylist = () => {
    const {user} = useAuth();
    const myList = useList(user?.uid);
    const {showModal, setShowModal, setCurrentMovie} = useModal();
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        if (myList.length > 0) {
            setMovies(
                myList.map((doc) => ({
                    id: doc.id,
                    title: doc.title || doc.name,
                    overview: doc.overview || "",
                    poster_path: doc.poster_path || "",
                    backdrop_path: doc.backdrop_path || "",
                    vote_average: doc.vote_average || 0,
                    release_date: doc.release_date || "",
                    original_language: doc.original_language || "en",
                    media_type: doc.media_type || "movie",
                }))
            );
        }
    }, [myList]);

    return (
        <div className="relative flex min-h-screen flex-col">
            <Head>
                <title>My List | CinemaVault</title>
            </Head>

            {/* Header */}
            <Header/>

            <main className="relative flex-grow p-6 overflow-y-scroll scrollbar-hide mt-20">
                <h1 className="text-4xl font-bold text-white mb-6">My List</h1>

                {movies.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {movies.map((movie) => (
                            <div
                                key={movie.id}
                                onClick={() => {
                                    setCurrentMovie(movie);
                                    setShowModal(true);
                                }}
                            >
                                <Thumbnail movie={movie}/>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No movies or shows added yet.</p>
                )}
            </main>

            {/* Modal */}
            {showModal && <Modal/>}

            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default Mylist;
