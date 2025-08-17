import MoviePoster from "./MoviePoster";
import MovieTitle from "./MovieTitle";
import MovieRating from "./MovieRating";
import { toImageUrl } from "@/utils/images";

const MovieCard = ({ movie, onClick, eager = false }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="w-80 h-50 bg-secondary-50 shadow-custom-drop hover:shadow-lg transition-shadow overflow-hidden">
        <MoviePoster
          src={toImageUrl(movie.thumbnailUrl)}
          alt={movie.title}
          eager={eager} // 초기 10개는 true
          ioRootId="scrollableDiv"
        />
      </div>
      <div className="flex items-center mt-2.5 px-0.5 justify-between">
        <div className="flex-1 min-w-0 max-w-43">
          <MovieTitle title={movie.title} />
        </div>
        <div className="shrink-0">
          <MovieRating rating={movie.rating} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
