import { Link } from "react-router";
import { IReview } from "../types/IReview";
import defineColor from "../helpers/colorDefiner";

function ReviewCard({ review }: { review: IReview }) {
  return (
    <div className="font-main rounded-xl py-1 px-2 bg-itemBackground dark:bg-itemBackgroundDark">
      <Link to={`/reviews/${review.reviewID}`}>
        <p className="font-bold text-xl ">{review.movieTitle}</p>
        <p className="truncate text-xs text-mainSecondary dark:text-mainSecondaryDark mt-1">
          {review.text}
        </p>
        <div className="flex justify-between items-center">
          <p className="italic text-xs text-mainSecondary dark:text-mainSecondaryDark">
            {new Date(review.updatedAt).toLocaleString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="tracking-wide mt-1">
            <span
              className={`font-bold text-${defineColor(review.personalRating)}`}
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
