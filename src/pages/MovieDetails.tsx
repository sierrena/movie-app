// src/pages/MovieDetails.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/omdb";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold">
        {movie.Title} ({movie.Year})
      </h2>
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-96 object-cover mt-4"
      />
      <div className="mt-4">
        <p>
          <strong>Genre:</strong> {movie.Genre}
        </p>
        <p>
          <strong>Director:</strong> {movie.Director}
        </p>
        <p>
          <strong>Cast:</strong> {movie.Actors}
        </p>
        <p>
          <strong>IMDB Rating:</strong> {movie.imdbRating}
        </p>
        <p>
          <strong>Duration:</strong> {movie.Runtime}
        </p>
        <p>
          <strong>Plot:</strong> {movie.Plot}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
