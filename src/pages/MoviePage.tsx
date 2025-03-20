import { useGetMovieByIDQuery } from "../api/api";
import { Link, useParams } from "react-router";
import { formatTime } from "../helpers/timeFormatter";
import Button from "../components/Button";
import { formatMoney } from "../helpers/moneyFormatter";
import LoadingSpinner from "../components/LoadingSpinner";

function MoviePage() {
  const { id } = useParams();
  const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE;

  const { data, isSuccess } = useGetMovieByIDQuery(id!);
  return isSuccess ? (
    <div className="relative">
      <div
        className="absolute z-0 w-full h-[70vh]"
        style={{
          backgroundImage: `url(${IMAGE_URL}/original/${data.backdrop_path})`,
          backgroundPosition: "50% 25%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className={`absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-background/0 via-background/40 to-background
              dark:from-backgroundDark/0 dark:via-backgroundDark/70 dark:to-backgroundDark`}
        ></div>
      </div>

      <div className="wrapper z-20 relative py-5 pt-48 font-main">
        <div className="grid grid-cols-3 gap-2.5 ">
          <img
            src={`${IMAGE_URL}/w500/${data.poster_path}`}
            alt=""
            className="col-span-1 rounded-xl hidden sm:block"
          />
          <div className="col-span-full bg-itemBackground dark:bg-itemBackgroundDark p-4 rounded-xl shadow-lg sm:col-span-2">
            <p className="text-3xl font-bold">{data.title}</p>
            <p className="text-mainSecondary dark:text-mainSecondaryDark italic -mt-1.5">
              {data.tagline}
            </p>
            {data.genres.length && (
              <div className="flex gap-2.5 mt-2 flex-wrap">
                {data.genres.map((genre) => (
                  <span className="dark:bg-itemBackground dark:text-main rounded-xl px-2 font-medium text-mainDark bg-itemBackgroundDark">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-4 mt-6 flex-wrap">
              <div className="flex gap-x-1 items-center">
                <svg
                  height={24}
                  width={24}
                  className="text-main dark:text-mainDark"
                >
                  <use href="/icons.svg#calendar" />
                </svg>
                <p>
                  {new Date(data.release_date).toLocaleDateString("en-GB", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex gap-x-1 items-center">
                <svg
                  height={24}
                  width={24}
                  className="text-main dark:text-mainDark"
                >
                  <use href="/icons.svg#timelapse" />
                </svg>
                <p>{formatTime(data.runtime)}</p>
              </div>
              <div className="flex gap-x-1 items-center">
                <svg height={24} width={24} color="#FFCC00">
                  <use href="/icons.svg#star" />
                </svg>
                <p>
                  {data.vote_average.toFixed(1)}{" "}
                  <span className="text-mainSecondary dark:text-mainSecondaryDark">
                    ({data.vote_count})
                  </span>
                </p>
              </div>
            </div>
            <p className="font-semibold text-xl mt-6">Overview</p>
            <p>{data.overview}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
              {data.budget > 0 && (
                <div>
                  <p className="text-mainSecondary dark:text-mainSecondaryDark text-xs">
                    Budget
                  </p>
                  <p>${formatMoney(data.budget)}</p>
                </div>
              )}
              {data.status && (
                <div>
                  <p className="text-mainSecondary dark:text-mainSecondaryDark text-xs">
                    Status
                  </p>
                  <p>{data.status}</p>
                </div>
              )}
              {data.production_companies.length && (
                <div>
                  <p className="text-mainSecondary dark:text-mainSecondaryDark text-xs">
                    Production
                  </p>
                  {data.production_companies.map((company) => (
                    <p>{company.name}</p>
                  ))}
                </div>
              )}
              {data.revenue > 0 && (
                <div>
                  <p className="text-mainSecondary dark:text-mainSecondaryDark text-xs">
                    Revenue
                  </p>
                  <p>${formatMoney(data.revenue)}</p>
                </div>
              )}
            </div>
            <div className="flex gap-2.5 mt-6 flex-wrap">
              <Link to={`/reviews/new/${data.id}`}>
                <Button type="accent">Write a review</Button>
              </Link>
              <Button type="primary">Add to wishlist</Button>
              <Button type="secondary">Watch trailer</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-[50vh] flex items-center justify-center">
      <LoadingSpinner size={50} />
    </div>
  );
}

export default MoviePage;
