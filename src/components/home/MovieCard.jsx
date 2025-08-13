import MoviePoster from "./MoviePoster";
import MovieTitle from "./MovieTitle";
import MovieRating from "./MovieRating";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="w-80 h-50 rounded-010 bg-secondary-50 shadow-custom-drop hover:shadow-lg transition-shadow overflow-hidden">
        <MoviePoster src={movie.posterUrl} alt={movie.title} />
      </div>
      <div className="flex items-center mt-2.5 px-0.5 justify-between">
        <MovieTitle title={movie.title} />
        <MovieRating rating={movie.rating} />
      </div>
    </div>
  );
};

export default MovieCard;
