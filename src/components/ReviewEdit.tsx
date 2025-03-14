import { Link, useNavigate, useParams } from "react-router";
import {
  useDeleteReviewMutation,
  useGetReviewByIDQuery,
  useUpdateReviewMutation,
} from "../api/api";
import { useEffect, useState } from "react";
import { IReview } from "../types/IReview";
import MovieSkeleton from "./MovieSkeleton";
import AutoExpandingTextarea from "./AutoExpandingTextarea";
import Button from "./Button";
import RatingSelector from "./RatingSelector";

function ReviewEdit() {
  const { id } = useParams();
  const review = useGetReviewByIDQuery(id!, {
    refetchOnMountOrArgChange: true,
  });
  const navigate = useNavigate();
  const [updateReview, updatedReview] = useUpdateReviewMutation();
  const [deleteReview, deletedReview] = useDeleteReviewMutation();
  const [editedReview, setEditedReview] = useState<IReview>({
    reviewID: "",
    movieID: "",
    movieTitle: "",
    text: "",
    personalRating: 1,
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

  useEffect(() => {
    if (deletedReview.isSuccess) {
      navigate("/reviews");
    }
  }, [deletedReview.isSuccess]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      editedReview.text !== review.data?.text ||
      editedReview.personalRating !== review.data?.personalRating
    ) {
      updateReview(editedReview);
    }
  };

  const deleteReviewHandler = (e: React.FormEvent) => {
    e.preventDefault();
    deleteReview(editedReview.reviewID);
  };

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
            <RatingSelector
              value={editedReview.personalRating}
              onChange={(e) =>
                setEditedReview({
                  ...editedReview,
                  personalRating: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="flex justify-center gap-2.5">
            <Button
              type="primary"
              className="mt-6"
              disabled={updatedReview.isLoading}
            >
              {updatedReview.isLoading ? "Updating review" : "Update review"}
            </Button>
            <Button
              onClick={deleteReviewHandler}
              type="secondary"
              className="mt-6"
              disabled={deletedReview.isLoading}
            >
              {deletedReview.isLoading ? "Deleting review" : "Delete review"}
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

export default ReviewEdit;
