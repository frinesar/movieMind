import { Link, useParams } from "react-router";
import { useGetReviewByIDQuery, useUpdateReviewMutation } from "../api/api";
import { useEffect, useState } from "react";
import MovieSkeleton from "../components/MovieSkeleton";
import AutoExpandingTextarea from "../components/AutoExpandingTextarea";
import { IReview } from "../types/IReview";
import Button from "../components/Button";

function ReviewPage() {
  const { id } = useParams();
  const review = useGetReviewByIDQuery(id!);
  const [updateReview, updatedReview] = useUpdateReviewMutation();
  const [editedReview, setEditedReview] = useState<IReview>({
    reviewID: "",
    movieID: "",
    movieTitle: "",
    text: "",
    personalRating: 0,
    updatedAt: "",
    createdAt: "",
  });

  useEffect(() => {
    if (review.isSuccess && review.data) {
      setEditedReview(review.data);
    }
  }, [review.isSuccess, review.data]);

  useEffect(() => {
    if (updatedReview.isSuccess && updatedReview.data) {
      setEditedReview(updatedReview.data);
    }
  }, [updatedReview.isSuccess, updatedReview.data]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      editedReview.text !== review.data?.text ||
      editedReview.personalRating !== review.data?.personalRating
    ) {
      updateReview(editedReview);
    }
  };

  const color =
    editedReview.personalRating >= 8
      ? "text-excellent"
      : editedReview.personalRating >= 6
      ? "text-average"
      : "text-bad";

  return (
    <div className="wrapper py-6">
      <div className=" flex justify-between">
        {review.isSuccess ? (
          <>
            <Link to={`/movie/${review.data.movieID}`}>
              <p className="font-title font-bold text-2xl">
                {review.data.movieTitle}{" "}
              </p>
            </Link>
          </>
        ) : (
          <MovieSkeleton className="h-8 w-1/4 rounded-xs" />
        )}
      </div>
      {review.isSuccess ? (
        <form onSubmit={submitHandler} className="mt-6">
          <AutoExpandingTextarea
            value={editedReview.text}
            onChange={(text) => setEditedReview({ ...editedReview, text })}
          />
          <div className="flex justify-between items-center mt-6 font-main">
            <p className="text-xs">
              {new Date(editedReview.updatedAt).toLocaleString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <div>
              <input
                className={`text-right font-bold w-fit ${color}`}
                type="number"
                inputMode="decimal"
                min={0}
                max={10}
                value={editedReview.personalRating}
                onChange={(e) =>
                  setEditedReview({
                    ...editedReview,
                    personalRating: Number(e.target.value),
                  })
                }
              />
              <span>/10</span>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="mt-6" disabled={updatedReview.isLoading}>
              {updatedReview.isLoading ? "Updating review" : "Update review"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="mt-6">
          <MovieSkeleton className="h-4 w-full rounded-xs mt-1 transition-colors" />
          <MovieSkeleton className="h-4 w-full rounded-xs mt-1" />
          <MovieSkeleton className="h-4 w-full rounded-xs mt-1" />
          <MovieSkeleton className="h-4 w-full rounded-xs mt-1" />
        </div>
      )}
    </div>
  );
}

export default ReviewPage;
