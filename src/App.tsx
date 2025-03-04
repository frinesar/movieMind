import {
  useGetTrendingMoviesQuery,
  useLazyGetUsersReviewsQuery,
} from "./api/api";

function App() {
  const trendingMovies = useGetTrendingMoviesQuery("week");
  const [trigger, reviews] = useLazyGetUsersReviewsQuery();
  return (
    <>
      {trendingMovies.isLoading && <p>Loading...</p>}

      {trendingMovies.isSuccess &&
        trendingMovies.data.results.map((movie) => {
          return (
            <div>
              <p>
                {movie.title} --- {movie.overview}
              </p>
            </div>
          );
        })}

      <button onClick={() => trigger()}>Get reviews</button>
    </>
  );
}

export default App;
