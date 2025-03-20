import { Link } from "react-router";
import { IMovie } from "../types/IMovie";
import { ITrendingMovie } from "../types/ITrendingMovies";

function MovieVerticalCard({ movie }: { movie: IMovie | ITrendingMovie }) {
  const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE;

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="rounded-xl max-w-48 hover:ring-2 ring-accent ring-0 transition-all group overflow-hidden ">
        <div className="relative">
          <img
            src={`${IMAGE_URL}/w342/${movie.poster_path}`}
            alt={`Poster for the ${movie.title}`}
            className="rounded-t-xl transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute bottom-2.5 left-2.5 bg-itemBackgroundDark/80 px-1 rounded-xs text-mainDark flex items-center gap-1">
            <svg height={16} width={16} color="#FFCC00">
              <use href="/icons.svg#star" />
            </svg>
            {movie.vote_average.toPrecision(2)}
          </div>
        </div>
        <div className="bg-itemBackground dark:bg-itemBackgroundDark rounded-b-xl px-2.5 py-1 relative z-20">
          <p className="font-medium line-clamp-1">{movie.title}</p>
          <p className="text-mainSecondary dark:text-mainSecondaryDark text-xs">
            {new Date(movie.release_date).toLocaleDateString("en-GB", {
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieVerticalCard;
