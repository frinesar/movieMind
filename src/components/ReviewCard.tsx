import { Link } from "react-router";
import { IReview } from "../types/IReview";

function ReviewCard({ review }: { review: IReview }) {
  const lastUpdated = new Date(review.updatedAt);

  return (
    <div className="font-main rounded-xl py-1 px-2 bg-itemBackground dark:bg-itemBackgroundDark">
      <Link to={`/reviews/${review.reviewID}`}>
        <p className="font-bold text-xl ">{review.movieTitle}</p>
        <p className="truncate">{review.text}</p>
        <div className="flex justify-between items-center">
          <p className="italic text-xs">
            {lastUpdated.toLocaleString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="tracking-wide">
            <span
              className={`font-bold ${
                review.personalRating >= 8
                  ? "text-excellent"
                  : review.personalRating >= 6
                  ? "text-average"
                  : "text-bad"
              }`}
            >
              {review.personalRating}
            </span>
            /10
          </p>
        </div>
      </Link>
    </div>
  );
}

export default ReviewCard;
