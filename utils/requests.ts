const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Store API key in environment variable
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
    // Movies Only
    fetchTrending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`,
    fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchPopularMovies: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`,
    fetchUpcomingMovies: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`,
    fetchSciFiMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878`, // Sci-Fi Movies

    // TV Shows Only
    fetchTrendingTV: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`,
    fetchTopRatedTV: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionTV: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10759`,
    fetchComedyTV: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorTV: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=9648`,
    fetchRomanceTV: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaryTV: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=99`,
    fetchPopularTV: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`,
    fetchSciFiTV: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10765`, // Sci-Fi & Fantasy TV Shows

    // Fetch details for a movie
    fetchMovieDetails: (movieId: number) =>
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`,

    // Fetch details for a TV show (includes number_of_seasons)
    fetchTVDetails: (tvId: number) =>
        `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=en-US`,

    // Search for movies & TV shows
    fetchSearchResults: (query: string) =>
        `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
            query
        )}`,
};

export default requests;
