import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Head from 'next/head';
import requests from '@/utils/requests';
import { Movie } from '@/typings';
import Row from '@/components/Row';
import Footer from '@/components/Footer';

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
      tvShowsRes,
      popularMoviesRes,
      upcomingMoviesRes,
    ] = await Promise.all([
      fetch(requests.fetchTrending),
      fetch(requests.fetchTopRated),
      fetch(requests.fetchActionMovies),
      fetch(requests.fetchComedyMovies),
      fetch(requests.fetchHorrorMovies),
      fetch(requests.fetchRomanceMovies),
      fetch(requests.fetchDocumentaries),
      fetch(requests.fetchTVShows),
      fetch(requests.fetchPopularMovies),
      fetch(requests.fetchUpcomingMovies),
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
      tvShows,
      popularMovies,
      upcomingMovies,
    ] = await Promise.all([
      trendingRes.json(),
      topRatedRes.json(),
      actionRes.json(),
      comedyRes.json(),
      horrorRes.json(),
      romanceRes.json(),
      documentariesRes.json(),
      tvShowsRes.json(),
      popularMoviesRes.json(),
      upcomingMoviesRes.json(),
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
        tvShows: tvShows.results || [],
        popularMovies: popularMovies.results || [],
        upcomingMovies: upcomingMovies.results || [],
      },
    };
  } catch (error) {
    console.error('Error fetching TMDB data:', error);
    return {
      props: {
        trending: [],
        topRated: [],
        action: [],
        comedy: [],
        horror: [],
        romance: [],
        documentaries: [],
        tvShows: [],
        popularMovies: [],
        upcomingMovies: [],
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
  tvShows: Movie[];
  popularMovies: Movie[];
  upcomingMovies: Movie[];
}

export default function Home({
  trending,
  topRated,
  action,
  comedy,
  horror,
  romance,
  documentaries,
  tvShows,
  popularMovies,
  upcomingMovies,
}: Props) {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-[#e3f2fd] via-[#f5e7fb] to-[#fbf6eb]">
      <Head>
        <title>CinemaVault by Rodtresha Paredes</title>
      </Head>

      {/* Header */}
      <Header />

      <main className="relative flex-grow pl-4 pb-24 lg:space-y-24 lg:pl-16">
        {/* Banner */}
        <Banner trending={trending} />

        <section className="relative">
          {/* Rows */}
          {/* My List */}

          <Row title="Trending Now" movies={trending} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Movies" movies={action} />
          <Row title="Comedy Movies" movies={comedy} />
          <Row title="Horror Movies" movies={horror} />
          <Row title="Romance Movies" movies={romance} />
          <Row title="Documentaries" movies={documentaries} />
          <Row title="TV Shows" movies={tvShows} />
          <Row title="Popular Movies" movies={popularMovies} />
          <Row title="Upcoming Movies" movies={upcomingMovies} />
        </section>
      </main>

      {/* Modal */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
