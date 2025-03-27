import {useEffect, useState} from "react";
import {Movie} from "@/typings";
import Thumbnail from "@/components/Thumbnail";
import requests from "@/utils/requests";
import {useRouter} from "next/router";
import {useModal} from "@/context/ModalContext";
import Modal from "@/components/Modal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

const Search = () => {
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const {showModal, setShowModal, setCurrentMovie} = useModal();
    const router = useRouter();
    const {query} = router.query; // Get search query from URL

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) return;
            setLoading(true);
            try {
                const res = await fetch(requests.fetchSearchResults(query as string));
                const data = await res.json();

                // Filter only movies & TV shows (ignore people)
                const filteredResults = data.results.filter(
                    (item: any) => item.media_type === "movie" || item.media_type === "tv"
                );

                setSearchResults(filteredResults);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
            setLoading(false);
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="relative flex min-h-screen flex-col">
            <Head>
                <title>Search Results | CinemaVault</title>
            </Head>

            {/* Header */}
            <Header/>

            <main className="relative flex-grow p-6 overflow-y-scroll scrollbar-hide mt-20">
                <h1 className="text-2xl font-semibold text-white mb-4">
                    Search Results for: <span className="text-gray-300">"{query}"</span>
                </h1>

                {loading ? (
                    <p className="text-white">Loading...</p>
                ) : searchResults.length === 0 ? (
                    <p className="text-gray-400">No results found.</p>
                ) : (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {searchResults.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    setCurrentMovie(item);
                                    setShowModal(true);
                                }}
                            >
                                <Thumbnail movie={item}/>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Modal */}
            {showModal && <Modal/>}

            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default Search;
