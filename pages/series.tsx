import {useEffect, useState} from "react";
import {Movie} from "@/typings";
import Thumbnail from "@/components/Thumbnail";
import requests from "@/utils/requests";
import {useModal} from "@/context/ModalContext";
import Modal from "@/components/Modal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

const Series = () => {
    const [tvShows, setTvShows] = useState<Movie[]>([]);
    const {showModal, setShowModal, setCurrentMovie} = useModal();

    useEffect(() => {
        const fetchTVShows = async () => {
            try {
                const responses = await Promise.all([
                    fetch(requests.fetchTrendingTV),
                    fetch(requests.fetchTopRatedTV),
                    fetch(requests.fetchActionTV),
                    fetch(requests.fetchComedyTV),
                    fetch(requests.fetchHorrorTV),
                    fetch(requests.fetchRomanceTV),
                    fetch(requests.fetchDocumentaryTV),
                    fetch(requests.fetchPopularTV),
                    fetch(requests.fetchSciFiTV),
                ]);

                const results = await Promise.all(responses.map((res) => res.json()));

                // Merge and remove duplicates
                const allTVShows = results.flatMap((res) => res.results);
                const uniqueTVShows = Array.from(new Map(allTVShows.map((show) => [show.id, show])).values());

                setTvShows(uniqueTVShows);
            } catch (error) {
                console.error("Error fetching TV Shows:", error);
            }
        };

        fetchTVShows();
    }, []);

    return (
        <div className="relative flex min-h-screen flex-col">
            <Head>
                <title>TV Shows | CinemaVault</title>
            </Head>

            {/* Header */}
            <Header/>

            <main className="relative flex-grow p-6 overflow-y-scroll scrollbar-hide mt-20">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {tvShows.map((show) => (
                        <div
                            key={show.id}
                            onClick={() => {
                                setCurrentMovie(show);
                                setShowModal(true);
                            }}
                        >
                            <Thumbnail movie={show}/>
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

export default Series
