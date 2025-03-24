import LoadingSpinner from "./LoadingSpinner";
import { IWishlistMovie } from "../types/IWishlistMovie";
import { useChangeMovieStatusInWishlistMutation } from "../api/api";
import { Link } from "react-router";

function WishlistMovie({ movie }: { movie: IWishlistMovie }) {
  const [changeMovieStatus, movieStatus] =
    useChangeMovieStatusInWishlistMutation();
  return (
    <Link to={`/movie/${movie.movieID}`}>
      <div className="font-main rounded-xl py-1 px-2 bg-itemBackground dark:bg-itemBackgroundDark flex justify-between items-center">
        <div>
          <p className="font-bold text-xl">{movie.title}</p>
          <p className="text-mainSecondary dark:text-mainSecondaryDark italic text-xs">
            {"Added at: "}
            {new Date(movie.addedAt).toLocaleString("en-GB", {
              year: "numeric",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        {movieStatus.isLoading ? (
          <LoadingSpinner />
        ) : (
          <input
            type="checkbox"
            checked={
              movieStatus.isUninitialized
                ? movie.isWatched
                : movieStatus.isSuccess
                ? !movie.isWatched
                : movie.isWatched
            }
            onClick={(e) => e.stopPropagation()}
            onChange={() => changeMovieStatus(movie.movieID)}
          />
        )}
      </div>
    </Link>
  );
}

export default WishlistMovie;
