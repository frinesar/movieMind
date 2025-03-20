import {
  useGetTrendingMoviesQuery,
  useGetTrendingPeopleQuery,
} from "../api/api";
import Carousel from "../components/Carousel";
import Heading from "../components/Heading";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieVerticalCard from "../components/MovieVerticalCard";
import PersonCard from "../components/PersonCard";

function MainPage() {
  const trendingMovies = useGetTrendingMoviesQuery("week");
  const trendingPeople = useGetTrendingPeopleQuery("week");

  return (
    <div className="m-auto">
      <section className="py-6 wrapper">
        <Heading>Trending movies</Heading>
        <div className="mt-6 pb-4 grid grid-cols-[repeat(auto-fit,_minmax(min(192px,40%),_1fr))] gap-2.5">
          {trendingMovies.isLoading && (
            <div className="h-[50vh] flex items-center justify-center">
              <LoadingSpinner size={50} />
            </div>
          )}
          {trendingMovies.isSuccess &&
            trendingMovies.data.results.map((movie) => (
              <MovieVerticalCard movie={movie} />
            ))}
        </div>
      </section>
      <section className="py-6 wrapper">
        <Heading>Trending people</Heading>
        <Carousel>
          {trendingMovies.isLoading && (
            <div className="h-[20vh] flex items-center w-full justify-center">
              <LoadingSpinner size={50} />
            </div>
          )}
          {trendingPeople.isSuccess &&
            trendingPeople.data.results.map((person) => (
              <PersonCard person={person} />
            ))}
        </Carousel>
      </section>
    </div>
  );
}

export default MainPage;
