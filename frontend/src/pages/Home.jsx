import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

function Home({ user, favorites, onFavoriteClick }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("/api/movies");
        setMovies(res.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-500 py-8 w-full box-border">
      <div>
        {user ? (
          <h1 className="text-3xl text-white font-bold mb-6 p-6">
            Welcome, {user.username}!
          </h1>
        ) : (
          <h1 className="text-2xl text-white font-bold mb-6 p-6">
            Login to favorite movies, watchlist and more!
          </h1>
        )}
      </div>
      <form className="max-w-xl mx-auto mb-8 flex gap-4 px-4 box-border">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-3 rounded bg-[#333] text-white text-base border-none focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        <button
          type="submit"
          className="px-6 py-3 bg-red-600 text-white rounded font-medium whitespace-nowrap hover:bg-red-500 transition-colors"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full box-border">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onFavoriteClick={onFavoriteClick}
            isFavorite={favorites.some((fav) => fav.id === movie.id)}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
export default Home;
