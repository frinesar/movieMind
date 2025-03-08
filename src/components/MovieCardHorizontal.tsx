import { Link } from "react-router";
import { IMovieSearch } from "../types/IMovieSearch";
import { ITrendingMovie } from "../types/ITrendingMovies";

function MovieHorizontalCard({
  movie,
  className,
}: {
  movie: IMovieSearch | ITrendingMovie;
  className?: string;
}) {
  const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE;
  console.log("rendered");

  return (
    <div
      key={movie.id}
      className={`relative rounded-xl group overflow-hidden aspect-[16/9] w-[min(384px,100%)] ${className}`}
    >
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`${IMAGE_URL}/w500/${movie.backdrop_path}`}
          className="w-full h-full rounded-xl transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute top-0 left-0 z-20 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.8)] to-[90%] rounded-xl"></div>
        <div className="absolute bottom-2.5 left-2.5 z-30 font-main text-background">
          <p className="font-bold text-xl ">{movie.title}</p>
          <div className="flex">
            <svg height={24} width={24} color="#FFCC00">
              <use href={`/icons.svg#star`}></use>
            </svg>
            <p className="text-itemBackground tracking-wide">
              {movie.vote_average.toFixed(1)} ({movie.vote_count})
            </p>
          </div>
        </div>
      </Link>
      <div>
        <svg className="absolute bottom-2.5 right-2.5 z-30 h-6 w-6 opacity-0 transition-transform duration-300 ease-in-out  group-hover:opacity-100">
          <use href="/icons.svg#bookmark" />
        </svg>
      </div>
    </div>
  );
}

export default MovieHorizontalCard;
