import { useState } from "react";
import { useLazyFindMovieQuery } from "../api/api";
import { useDebouncedCallback } from "use-debounce";
import SearchField from "../components/SearchField";
import MovieRow from "../components/MovieRow";

function SearchPage() {
  const [find, findResult] = useLazyFindMovieQuery();
  const [query, setQuery] = useState("");

  const debounced = useDebouncedCallback((query) => {
    if (query.trim()) {
      find(query.trim());
    }
  }, 2000);

  return (
    <div className="wrapper py-6">
      <p className="text-2xl font-medium">What movie is on your mind?</p>
      <SearchField
        onChange={(e) => {
          debounced(e.target.value);
          setQuery(e.target.value);
        }}
        value={query}
      />
      {findResult.isSuccess && (
        <div className="flex flex-col gap-2.5 mt-6">
          {findResult.data.results.map((movie) => (
            <MovieRow movie={movie} />
          ))}
        </div>
      )}
      {findResult.isFetching && <p>Looking for the "{query}"</p>}
    </div>
  );
}

export default SearchPage;
