import { useGetWishlistQuery } from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";
import WishlistMovie from "../components/WishlistMovie";

function WishlistPage() {
  const wishlist = useGetWishlistQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="wrapper py-6">
      {wishlist.isLoading && <LoadingSpinner />}
      {wishlist.isSuccess && (
        <div className="flex flex-col gap-2.5">
          {wishlist.data.map((movie) => (
            <WishlistMovie key={movie.movieID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
