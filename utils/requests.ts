const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Store API key in environment variable
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchTVShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US`,
  fetchPopularMovies: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`,
  fetchUpcomingMovies: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`,

  // Fetch details for a movie
  fetchMovieDetails: (movieId: number) =>
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`,

  // Fetch details for a TV show (includes number_of_seasons)
  fetchTVDetails: (tvId: number) =>
    `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=en-US`,

  // Search for movies & TV shows
  fetchSearchResults: (query: string) =>
    `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      query,
    )}`,
};

export default requests;
