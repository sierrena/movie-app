import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // Assuming the Card component is available

const MovieDetails = () => {
  // Assuming you fetch movie data using the ID from the URL params
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
        Movie Details
      </h1>

      {/* Movie Card with detailed info */}
      <Card className="w-full max-w-md mx-auto">
        <div className="flex flex-col md:flex-row">
          <img
            src="https://www.themoviedb.org/t/p/w1280/abf8tHznhSvl9BAElD2cQeRr7do.jpg"
            alt="Movie Poster"
            className="w-full md:w-48 h-72 object-cover rounded-t-md md:rounded-l-md"
          />
          <div className="p-4">
            <h3 className="text-3xl font-semibold">Movie Title</h3>
            <p className="text-gray-600 mt-2">
              Detailed description of the movie. This is a longer summary that
              includes the plot, key actors, and other interesting facts.
            </p>

            <div className="mt-4">
              <Button className="mr-4" onClick={() => alert("Watch trailer")}>
                Watch Trailer
              </Button>
              <Button onClick={() => alert("Add to Watchlist")}>
                Add to Watchlist
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MovieDetails;
