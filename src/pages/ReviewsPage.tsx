import { useGetUsersReviewsQuery } from "../api/api";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import ReviewCard from "../components/ReviewCard";

function ReviewsPage() {
  const { data, isLoading, isSuccess } = useGetUsersReviewsQuery();

  return (
    <div className="wrapper py-6">
      {isLoading && <LoadingSpinner />}
      {isSuccess && (
        <>
          <div className="flex justify-between items-center">
            <p>Total reviews: {data.length}</p>
            <Button icon="add_review">Write a new review</Button>
          </div>
          <div className="flex flex-col gap-2.5 mt-6">
            {data.map((review) => (
              <ReviewCard review={review} key={review.reviewID} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ReviewsPage;
