import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "http://www.omdbapi.com/";

// Function to search for movies
export const searchMovies = async (
  query: string,
  type: string = "movie",
  year?: string,
  page: number = 1
) => {
  try {
    const params: Record<string, string | number | undefined> = {
      s: query,
      type,
      y: year,
      page,
      apiKey: API_KEY,
    };

    const { data } = await axios.get(BASE_URL, { params });

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
export const getMovieDetails = async (id: string) => {
  try {
    const params = {
      i: id,
      apiKey: API_KEY,
    };

    const { data } = await axios.get(BASE_URL, { params });

    if (data.Response === "False") {
      throw new Error(data.Error || "Failed to fetch movie details.");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching movie details:", error.message);
    throw new Error(error.message || "Failed to fetch movie details.");
  }
};
