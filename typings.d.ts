export interface Genre {
    id: number;
    name: string;
}

export interface Movie {
    id: number;
    title?: string; // Some results may have "name" instead of "title" (e.g., TV shows)
    name?: string; // For TV shows
    original_title?: string;
    original_name?: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    media_type?: string; // Can be "movie" or "tv"
    genre_ids: number[]; // Array of genre IDs
    popularity: number;
    vote_average: number;
    vote_count: number;
    release_date?: string;
    first_air_date?: string; // For TV shows
    number_of_seasons?: string; // Only for TV Shows
    video?: boolean; // If it's a video
    original_language: string; // The original language of the movie or TV show
}

export interface MovieDetails extends Movie {
    genres: Genre[]; // Full genre objects instead of just IDs
    runtime?: number; // Duration of the movie
    episode_run_time?: number[]; // Array of episode durations (for TV shows)
    status?: string; // Movie status (e.g., "Released", "Post Production")
    tagline?: string;
    homepage?: string; // Official website
    budget?: number;
    revenue?: number;
    production_companies?: { name: string; logo_path: string | null }[];
    videos?: {
        results: {
            id: string;
            key: string; // YouTube video key
            name: string;
            site: string; // Should be "YouTube" or "Vimeo"
            type: string; // E.g., "Trailer", "Teaser"
        }[];
    };
    credits?: {
        cast: {
            id: number;
            name: string;
            profile_path: string | null;
            character: string;
        }[];
        crew: {
            id: number;
            name: string;
            profile_path: string | null;
            job: string;
        }[];
    };
}

export interface Element {
    type: "Trailer" | "Teaser" | "Clip" | "Featurette";
    id: string;
    key: string; // YouTube video key
    name: string;
    site: string; // "YouTube" or "Vimeo"
    official?: boolean;
}
