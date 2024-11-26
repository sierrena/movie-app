import React from "react";
import { Button } from "@/components/ui/button"; // Shadcn Button component
import { Card } from "@/components/ui/card"; // Assuming you will add Card component

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
        Movie Explorer
      </h1>

      {/* Button to load movies */}
      <Button
        className="mb-8"
        onClick={() => alert("Load movies functionality coming soon!")}
      >
        Explore Movies
      </Button>

      {/* Movie List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Movie Card Example */}
        <Card className="w-full max-w-sm mx-auto">
          <img
            src="https://www.themoviedb.org/t/p/w1280/abf8tHznhSvl9BAElD2cQeRr7do.jpg"
            alt="Movie Poster"
            className="w-full h-48 object-cover rounded-t-md"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">Movie Title</h3>
            <p className="text-gray-600 mt-2">
              This is a description of the movie.
            </p>
            <Button className="mt-4" onClick={() => alert("View Details")}>
              View Details
            </Button>
          </div>
        </Card>

        {/* More Movie Cards... */}
      </div>
    </div>
  );
};

export default Home;
