import { useLazyFindMovieQuery } from "../api/api";
import { useDebouncedCallback } from "use-debounce";
import SearchField from "../components/SearchField";
import { Link, useSearchParams } from "react-router";
import { useEffect } from "react";

function SearchPage() {
  const [find, findResult] = useLazyFindMovieQuery();
  const [searchParams, setSearchParams] = useSearchParams({ query: "" });
  const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE;

  const debounced = useDebouncedCallback((query) => {
    if (query) {
      find(query);
    }
  }, 2000);
  useEffect(() => {
    if (searchParams.get("query")) {
      find(searchParams.get("query")!.trim());
    }
  }, []);

  return (
    <div className="wrapper py-6">
      <p className="text-2xl font-medium">What movie is on your mind?</p>
      <SearchField
        onChange={(e) => {
          setSearchParams({ query: e.target.value.trim() });
          debounced(e.target.value.trim());
        }}
        value={searchParams.get("query")!}
      />
      {findResult.isFetching && (
        <p className="text-xs text-mainSecondary dark:text-mainSecondaryDark">
          Looking for the "{searchParams.get("query")}"
        </p>
      )}
      {findResult.isSuccess && (
        <div className="flex flex-col gap-2.5 mt-6">
          {findResult.data.results.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="flex bg-itemBackground dark:bg-itemBackgroundDark rounded-xl relative">
                <img
                  src={`${IMAGE_URL}/w92/${movie.poster_path}`}
                  alt={`Movie poster for ${movie.title}`}
                  className="h-20 rounded-l-xl"
                />
                <div className="font-main px-2.5">
                  <p className="text-2xl font-medium line-clamp-1">
                    {movie.title}
                  </p>
                  <p className="line-clamp-2 text-mainSecondary dark:text-mainSecondaryDark text-xs mt-1">
                    {movie.overview}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
