import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMovies,
  setTotalResults,
  setLoading,
  setError,
  setSearchQuery,
} from "../features/movieslice";
import { searchMovies } from "../services/omdb";
import MovieCard from "../components/MovieCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

const Home = () => {
  const dispatch = useDispatch();
  const { movies, totalResults, searchQuery, isLoading, error } = useSelector(
    (state: any) => state.movie
  );

  const [page, setPage] = useState(1);
  const [year, setYear] = useState(""); // State for filtering by year
  const [searchType, setSearchType] = useState("movie"); // State for search type (movie, series, or episode)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setMovies([])); // Clear previous search results

        const data = await searchMovies(searchQuery, searchType, year, page); // Pass searchType, year filter

        if (data.Error || (data.Search && data.Search.length === 0)) {
          // If no movies found, clear results and show "No movies found"
          dispatch(setMovies([]));
        } else if (data.Search && data.Search.length > 0) {
          // If movies found, set them
          dispatch(setMovies(data.Search));
          dispatch(setTotalResults(data.totalResults || 0));
        }

        dispatch(setLoading(false));
      } catch (err: any) {
        dispatch(setError(err.message));
        dispatch(setLoading(false));
      }
    };

    if (searchQuery) {
      fetchMovies();
    } else {
      dispatch(setMovies([])); // Clear movies if searchQuery is empty
    }
  }, [dispatch, searchQuery, searchType, year, page]); // Trigger effect when searchQuery, searchType, year, or page changes

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
    setPage(1); // Reset page when search query changes
  };

  const handleYearChange = (value: string) => {
    setYear(value);
  };

  const handleSearchTypeChange = (value: string) => {
    setSearchType(value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(Number(e.target.value));
  };

  const totalPages = Math.ceil(totalResults / 10);
  const currentYear = new Date().getFullYear();

  return (
    <div className="p-5">
      {/* Search Input and Type Selector */}
      <div className="mb-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <Input
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search movies"
          className="p-2 w-full md:w-72 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
        />

        {/* Year Select */}
        <Select
          value={year}
          onValueChange={handleYearChange}
          className="w-full md:w-32"
        >
          <SelectTrigger className="p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out">
            <span>{year ? year : "Select Year"}</span>
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: currentYear - 1901 }, (_, i) => 1902 + i).map(
              (year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>

        {/* Search Type Selector (Movie, Series, or Episode) */}
        <Select
          value={searchType}
          onValueChange={handleSearchTypeChange}
          className="w-full md:w-32"
        >
          <SelectTrigger className="p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out">
            <span>
              {searchType === "movie"
                ? "Movies"
                : searchType === "series"
                ? "TV Series"
                : "Episodes"}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="movie">Movies</SelectItem>
            <SelectItem value="series">TV Series</SelectItem>
            <SelectItem value="episode">TV Episodes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-full">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
          </div>
        ) : movies.length === 0 ? (
          <p className="text-center text-lg font-semibold text-gray-500">
            No movies found.
          </p>
        ) : (
          movies.map((movie: any) => (
            <MovieCard
              key={movie.imdbID}
              imdbID={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              year={movie.Year}
            />
          ))
        )}
      </div>

      <div className="mt-4 flex items-center justify-center space-x-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="p-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Previous
        </button>
        <select
          value={page}
          onChange={handlePageSelect}
          className="p-2 border border-gray-300 rounded-lg"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <option key={pageNum} value={pageNum}>
                {pageNum}
              </option>
            )
          )}
        </select>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page * 10 >= totalResults}
          className="p-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
