const API_URL = import.meta.env.VITE_API_URL;

function MovieCard({ movie, onFavoriteClick, isFavorite, user }) {
  const imageUrl = movie.picture ? `${API_URL}${movie.picture}` : null;

  return (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-md">
      <div className="h-80 bg-gray-700">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            No Image
          </div>
        )}
      </div>
      <div className="p-4">
        {user && (
          <button
            onClick={() => onFavoriteClick(movie)}
            className="text-2xl mb-2"
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        )}

        <h3 className="text-lg font-bold">{movie.title}</h3>
        <p className="text-gray-400">{movie.release_date}</p>
      </div>
    </div>
  );
}

export default MovieCard;
