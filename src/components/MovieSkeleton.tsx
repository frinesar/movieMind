function MovieSkeleton({ className }: { className: string }) {
  return (
    <div
      className={`bg-itemBackgroundDark animate-pulse rounded-xl ${className}`}
    ></div>
  );
}

export default MovieSkeleton;
