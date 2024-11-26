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
    <div className="p-4 border border-stone-800 rounded-lg bg-stone-800 shadow-lg movie-card fade-in scale-up hover:scale-up">
      <Link to={`/movie/${imdbID}`} className="no-underline text-rose-700">
        <img
          src={
            poster && poster !== "N/A" ? poster : "https://picsum.photos/200"
          }
          alt={title}
          className="w-full h-60 object-cover mb-4"
        />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="mb-2">{year}</p>
        <p>IMDB ID: {imdbID}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
