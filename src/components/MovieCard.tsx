// src/components/MovieCard.tsx

import React from "react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  imdbID: string;
  title: string;
  poster: string;
  year: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  imdbID,
  title,
  poster,
  year,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg movie-card fade-in scale-up hover:scale-up">
      <Link to={`/movie/${imdbID}`}>
        <img
          src={poster}
          alt={title}
          className="w-full h-60 object-cover mb-4"
        />
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>{year}</p>
        <p>IMDB ID: {imdbID}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
