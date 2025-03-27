import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Head from "next/head";
import requests from "@/utils/requests";
import {Movie} from "@/typings";
import Row from "@/components/Row";
import Footer from "@/components/Footer";
import useAuth from "@/hooks/useAuth";
import {useModal} from "@/context/ModalContext";
import Modal from "@/components/Modal";
import useList from "@/hooks/useList";

export const getServerSideProps = async () => {
    try {
        // Fetch all requests in parallel
        const [
            trendingRes,
            topRatedRes,
            actionRes,
            comedyRes,
            horrorRes,
            romanceRes,
            documentariesRes,
            popularMoviesRes,
            upcomingMoviesRes,
            sciFiMoviesRes, // Fetch Sci-Fi Movies

            // TV Shows
            trendingTVRes,
            topRatedTVRes,
            actionTVRes,
            comedyTVRes,
            horrorTVRes,
            romanceTVRes,
            documentaryTVRes,
            popularTVRes,
            sciFiTVRes, // Fetch Sci-Fi TV Shows
        ] = await Promise.all([
            fetch(requests.fetchTrending),
            fetch(requests.fetchTopRated),
            fetch(requests.fetchActionMovies),
            fetch(requests.fetchComedyMovies),
            fetch(requests.fetchHorrorMovies),
            fetch(requests.fetchRomanceMovies),
            fetch(requests.fetchDocumentaries),
            fetch(requests.fetchPopularMovies),
            fetch(requests.fetchUpcomingMovies),
            fetch(requests.fetchSciFiMovies), // Fetch Sci-Fi Movies

            // TV Shows
            fetch(requests.fetchTrendingTV),
            fetch(requests.fetchTopRatedTV),
            fetch(requests.fetchActionTV),
            fetch(requests.fetchComedyTV),
            fetch(requests.fetchHorrorTV),
            fetch(requests.fetchRomanceTV),
            fetch(requests.fetchDocumentaryTV),
            fetch(requests.fetchPopularTV),
            fetch(requests.fetchSciFiTV), // Fetch Sci-Fi TV Shows
        ]);

        // Convert responses to JSON
        const [
            trending,
            topRated,
            action,
            comedy,
            horror,
            romance,
            documentaries,
            popularMovies,
            upcomingMovies,
            sciFiMovies, // Sci-Fi Movies

            // TV Shows
            trendingTV,
            topRatedTV,
            actionTV,
            comedyTV,
            horrorTV,
            romanceTV,
            documentaryTV,
            popularTV,
            sciFiTV, // Sci-Fi TV Shows
        ] = await Promise.all([
            trendingRes.json(),
            topRatedRes.json(),
            actionRes.json(),
            comedyRes.json(),
            horrorRes.json(),
            romanceRes.json(),
            documentariesRes.json(),
            popularMoviesRes.json(),
            upcomingMoviesRes.json(),
            sciFiMoviesRes.json(), // Sci-Fi Movies

            // TV Shows
            trendingTVRes.json(),
            topRatedTVRes.json(),
            actionTVRes.json(),
            comedyTVRes.json(),
            horrorTVRes.json(),
            romanceTVRes.json(),
            documentaryTVRes.json(),
            popularTVRes.json(),
            sciFiTVRes.json(), // Sci-Fi TV Shows
        ]);

        return {
            props: {
                trending: trending.results || [],
                topRated: topRated.results || [],
                action: action.results || [],
                comedy: comedy.results || [],
                horror: horror.results || [],
                romance: romance.results || [],
                documentaries: documentaries.results || [],
                popularMovies: popularMovies.results || [],
                upcomingMovies: upcomingMovies.results || [],
                sciFiMovies: sciFiMovies.results || [], // Sci-Fi Movies

                // TV Shows
                trendingTV: trendingTV.results || [],
                topRatedTV: topRatedTV.results || [],
                actionTV: actionTV.results || [],
                comedyTV: comedyTV.results || [],
                horrorTV: horrorTV.results || [],
                romanceTV: romanceTV.results || [],
                documentaryTV: documentaryTV.results || [],
                popularTV: popularTV.results || [],
                sciFiTV: sciFiTV.results || [], // Sci-Fi TV Shows
            },
        };
    } catch (error) {
        console.error("Error fetching TMDB data:", error);
        return {
            props: {
                trending: [],
                topRated: [],
                action: [],
                comedy: [],
                horror: [],
                romance: [],
                documentaries: [],
                popularMovies: [],
                upcomingMovies: [],
                sciFiMovies: [], // Sci-Fi Movies

                // TV Shows (fallback)
                trendingTV: [],
                topRatedTV: [],
                actionTV: [],
                comedyTV: [],
                horrorTV: [],
                romanceTV: [],
                documentaryTV: [],
                popularTV: [],
                sciFiTV: [], // Sci-Fi TV Shows
            },
        };
    }
};

interface Props {
    trending: Movie[];
    topRated: Movie[];
    action: Movie[];
    comedy: Movie[];
    horror: Movie[];
    romance: Movie[];
    documentaries: Movie[];
    popularMovies: Movie[];
    upcomingMovies: Movie[];
    sciFiMovies: Movie[]; // Sci-Fi Movies

    // TV Shows
    trendingTV: Movie[];
    topRatedTV: Movie[];
    actionTV: Movie[];
    comedyTV: Movie[];
    horrorTV: Movie[];
    romanceTV: Movie[];
    documentaryTV: Movie[];
    popularTV: Movie[];
    sciFiTV: Movie[]; // Sci-Fi TV Shows
}

export default function Home({
                                 trending,
                                 topRated,
                                 action,
                                 comedy,
                                 horror,
                                 romance,
                                 documentaries,
                                 popularMovies,
                                 upcomingMovies,
                                 sciFiMovies,

                                 // TV Shows
                                 trendingTV,
                                 topRatedTV,
                                 actionTV,
                                 comedyTV,
                                 horrorTV,
                                 romanceTV,
                                 documentaryTV,
                                 popularTV,
                                 sciFiTV
                             }: Props) {
    const {loading, user} = useAuth();
    const {showModal} = useModal();
    const myList = useList(user?.uid);

    if (loading) return null;

    return (
        <div className="relative flex min-h-screen flex-col">
            <Head>
                <title>Homepage | CinemaVault</title>
            </Head>

            {/* Header */}
            <Header/>

            <main className="relative flex-grow pb-24 pl-10 lg:space-y-24 lg:pl-16">
                {/* Banner */}
                <Banner trending={trending}/>

                <section className="relative">
                    {/* My List Component */}
                    {myList.length > 0 && <Row title="My List" movies={myList as Movie[]}/>}

                    {/* Rows for Movies */}
                    <Row title="Trending Now" movies={trending}/>
                    <Row title="Top Rated" movies={topRated}/>
                    <Row title="Action Movies" movies={action}/>
                    <Row title="Comedy Movies" movies={comedy}/>
                    <Row title="Horror Movies" movies={horror}/>
                    <Row title="Romance Movies" movies={romance}/>
                    <Row title="Sci-Fi Movies" movies={sciFiMovies}/>
                    <Row title="Documentaries" movies={documentaries}/>
                    <Row title="Popular Movies" movies={popularMovies}/>
                    <Row title="Upcoming Movies" movies={upcomingMovies}/>

                    {/* Rows for TV Shows */}
                    <Row title="Trending TV Shows" movies={trendingTV}/>
                    <Row title="Top Rated TV Shows" movies={topRatedTV}/>
                    <Row title="Action TV Shows" movies={actionTV}/>
                    <Row title="Comedy TV Shows" movies={comedyTV}/>
                    <Row title="Horror TV Shows" movies={horrorTV}/>
                    <Row title="Romance TV Shows" movies={romanceTV}/>
                    <Row title="Sci-Fi & Fantasy TV Shows" movies={sciFiTV}/>
                    <Row title="Documentary TV Shows" movies={documentaryTV}/>
                    <Row title="Popular TV Shows" movies={popularTV}/>
                </section>
            </main>

            {/* Modal */}
            {showModal && <Modal/>}

            {/* Footer */}
            <Footer/>
        </div>
    );
}

