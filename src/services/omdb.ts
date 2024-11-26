import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "http://www.omdbapi.com/";

// Define the structure of a single movie
export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

// Define the structure of the response for movie search
export interface MovieSearchResponse {
  Search: Movie[]; // Array of movies
  totalResults: string; // API returns this as a string
  Response: string; // "True" or "False"
  Error?: string; // If the request fails, this field exists
}

// Define the structure of movie details
export interface MovieDetails {
  Title: string;
  Year: string;
  Poster: string;
  Genre: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  Runtime: string;
  Plot: string;
  [key: string]: string | undefined; // Handle additional dynamic fields
}

// Function to search for movies
export const searchMovies = async (
  query: string,
  type: "movie" | "series" | "episode" = "movie",
  year?: string,
  page: number = 1
): Promise<MovieSearchResponse> => {
  try {
    const params: Record<string, string | number | undefined> = {
      s: query,
      type,
      y: year,
      page,
      apiKey: API_KEY,
    };

    const { data } = await axios.get<MovieSearchResponse>(BASE_URL, { params });

    if (data.Response === "False") {
      throw new Error(data.Error || "Failed to fetch movies.");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching movies:", error.message);
    throw new Error(error.message || "Failed to fetch movies.");
  }
};

// Function to fetch movie details
export const getMovieDetails = async (id: string): Promise<MovieDetails> => {
  try {
    const params = {
      i: id,
      apiKey: API_KEY,
    };

    const { data } = await axios.get<MovieDetails>(BASE_URL, { params });

    if (data.Response === "False") {
      throw new Error(data.Error || "Failed to fetch movie details.");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching movie details:", error.message);
    throw new Error(error.message || "Failed to fetch movie details.");
  }
};
