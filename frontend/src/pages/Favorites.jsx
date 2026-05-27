import MovieCard from "../components/MovieCard";

function Favorites({ favorites, onFavoriteClick }) {
  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-500 text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">No Favorite Movies Yet</h2>
        <p className="text-gray-400">
          Start adding your favorite movies and they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-500 text-white">
      <h2 className="text-2xl font-bold mb-6">Your Favorites</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onFavoriteClick={onFavoriteClick}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
