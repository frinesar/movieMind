import { Link } from "react-router";
import { IMovieSearch } from "../types/IMovieSearch";

function MovieRow({ movie }: { movie: IMovieSearch }) {
  const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE;

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="flex bg-itemBackground dark:bg-itemBackgroundDark rounded-xl">
        <img
          src={`${IMAGE_URL}/w200/${movie.poster_path}`}
          alt={`Movie poster for ${movie.title}`}
          className="h-28 rounded-l-xl"
        />
        <div className="font-main px-2.5">
          <p className="text-2xl font-medium line-clamp-1">{movie.title}</p>
          <p className="line-clamp-2 text-mainSecondary dark:text-mainSecondaryDark text-xs mt-2">
            {movie.overview}
          </p>
          <div className="flex mt-auto">
            <svg height={24} width={24} color="#FFCC00">
              <use href={`/icons.svg#star`}></use>
            </svg>
            {movie.vote_count && movie.vote_average && (
              <p className="text-itemBackgroundDark dark:text-itemBackground tracking-wide">
                {movie.vote_average.toFixed(1)} ({movie.vote_count})
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieRow;
