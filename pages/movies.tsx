import {useEffect, useState} from "react";
import {Movie} from "@/typings";
import Thumbnail from "@/components/Thumbnail";
import requests from "@/utils/requests";
import {useModal} from "@/context/ModalContext";
import Modal from "@/components/Modal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const {showModal, setShowModal, setCurrentMovie} = useModal();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const responses = await Promise.all([
                    fetch(requests.fetchTrending),
                    fetch(requests.fetchTopRated),
                    fetch(requests.fetchActionMovies),
                    fetch(requests.fetchComedyMovies),
                    fetch(requests.fetchHorrorMovies),
                    fetch(requests.fetchRomanceMovies),
                    fetch(requests.fetchDocumentaries),
                    fetch(requests.fetchPopularMovies),
                    fetch(requests.fetchUpcomingMovies),
                    fetch(requests.fetchSciFiMovies),
                ]);

                const results = await Promise.all(responses.map((res) => res.json()));

                // Merge all movies and remove duplicates
                const allMovies = results.flatMap((res) => res.results);
                const uniqueMovies = Array.from(new Map(allMovies.map((movie) => [movie.id, movie])).values());

                setMovies(uniqueMovies);
            } catch (error) {
                console.error("Error fetching Movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="relative flex min-h-screen flex-col">
            <Head>
                <title>Movies | CinemaVault</title>
            </Head>

            {/* Header */}
            <Header/>

            <main className="relative flex-grow p-6 overflow-y-scroll scrollbar-hide mt-20">
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
            </main>

            {/* Modal */}
            {showModal && <Modal/>}

            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default Movies;
