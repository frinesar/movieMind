import { useGetMovieByIDQuery } from "../api/api";
import { useParams } from "react-router";

function MoviePage() {
  const { id } = useParams();

  const { data, isSuccess } = useGetMovieByIDQuery(id!);
  return <div>{isSuccess && data.title}</div>;
}

export default MoviePage;
