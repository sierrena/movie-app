import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/omdb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
interface MovieDetailsType {
  Title: string;
  Year: string;
  Poster: string;
  Genre: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  Runtime: string;
  Plot: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (id) {
          const data = await getMovieDetails(id);
          setMovie(data as MovieDetailsType);
        }
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Unable to fetch movie details. Please try again later.");
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie && !error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-lg">Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
        <Button
          className="ml-4 bg-rose-700 hover:bg-rose-600"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-5">
      <div className="bg-stone-800 rounded-lg shadow-lg max-w-4xl w-full p-6">
        {/* Movie Title and Year */}
        <h1 className="text-rose-700 text-3xl font-bold mb-4">
          {movie.Title} ({movie.Year})
        </h1>

        <Separator className="bg-rose-700 mb-4" />

        {/* Movie Poster */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="rounded-lg shadow-lg w-full md:w-1/3 object-cover"
          />

          {/* Movie Info */}
          <div className="flex flex-col gap-3 text-white">
            <p>
              <strong className="text-rose-700">Genre:</strong> {movie.Genre}
            </p>
            <p>
              <strong className="text-rose-700">Director:</strong>{" "}
              {movie.Director}
            </p>
            <p>
              <strong className="text-rose-700">Cast:</strong> {movie.Actors}
            </p>
            <p>
              <strong className="text-rose-700">IMDB Rating:</strong>{" "}
              {movie.imdbRating}
            </p>
            <p>
              <strong className="text-rose-700">Duration:</strong>{" "}
              {movie.Runtime}
            </p>
          </div>
        </div>

        <Separator className="bg-rose-700 my-4" />

        {/* Movie Plot */}
        <div className="mt-4">
          <h2 className="text-rose-700 text-xl font-semibold mb-2">Plot</h2>
          <p className="text-white leading-relaxed">{movie.Plot}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6">
          <Button
            variant="secondary"
            className="bg-rose-700 hover:bg-rose-600"
            onClick={() => navigate("/")} // Navigate to the home page
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
