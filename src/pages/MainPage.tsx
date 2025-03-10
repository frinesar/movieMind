import { useGetTrendingMoviesQuery } from "../api/api";
import Heading from "../components/Heading";
import MovieHorizontalCard from "../components/MovieCardHorizontal";
import MovieSkeleton from "../components/MovieSkeleton";

function MainPage() {
  const trendingMovies = useGetTrendingMoviesQuery("week");

  return (
    <div className="m-auto">
      <section className="py-6 wrapper">
        <Heading>Trending movies</Heading>
        <div className="mt-6 pb-4 flex gap-4 overflow-x-auto snap-x lg:snap-none ">
          {trendingMovies.isLoading &&
            [...Array(20)].map(() => (
              <MovieSkeleton className="w-[min(384px,100%)] shrink-0 aspect-[16/9]" />
            ))}
          {trendingMovies.isSuccess &&
            trendingMovies.data.results.map((movie) => (
              <MovieHorizontalCard
                key={movie.id}
                className="snap-start shrink-0"
                movie={movie}
              />
            ))}
        </div>
      </section>
    </div>
  );
}

export default MainPage;
