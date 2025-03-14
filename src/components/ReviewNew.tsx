import { useNavigate, useParams } from "react-router";
import { useCreateReviewMutation, useGetMovieByIDQuery } from "../api/api";
import { useEffect, useState } from "react";
import { IReview } from "../types/IReview";
import MovieSkeleton from "./MovieSkeleton";
import AutoExpandingTextarea from "./AutoExpandingTextarea";
import Button from "./Button";
import RatingSelector from "./RatingSelector";

function ReviewNew() {
  const { movieID } = useParams();
  const movie = useGetMovieByIDQuery(movieID!);
  const navigate = useNavigate();
  const [createReview, createdReview] = useCreateReviewMutation();
  const [newReview, setNewReview] = useState<
    Omit<IReview, "reviewID" | "createdAt" | "updatedAt" | "movieTitle">
  >({
    movieID: "",
    text: "",
    personalRating: 1,
  });

  useEffect(() => {
    if (createdReview.isSuccess) {
      navigate("/reviews");
    }
  }, [createdReview.isSuccess]);
  useEffect(() => {
    if (movie.isSuccess) {
      setNewReview({ ...newReview, movieID: movie.data.id.toString() });
    }
  }, [movie.isSuccess]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    createReview(newReview);
  };

  return (
    <div className="wrapper py-6">
      {movie.isSuccess ? (
        <p>{movie.data.title}</p>
      ) : (
        <MovieSkeleton className="h-8 w-1/4 rounded-xs" />
      )}

      <form onSubmit={submitHandler} className="mt-6">
        <AutoExpandingTextarea
          value={newReview.text}
          onChange={(text) => setNewReview({ ...newReview, text })}
        />
        <div className="text-right">
          <RatingSelector
            value={newReview.personalRating}
            onChange={(e) =>
              setNewReview({
                ...newReview,
                personalRating: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="flex justify-center">
          <Button
            type="primary"
            className="mt-6"
            disabled={createdReview.isLoading}
          >
            {createdReview.isLoading ? "Saving new review" : "Save review"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ReviewNew;
