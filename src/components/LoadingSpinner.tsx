import { ClipLoader } from "react-spinners";

function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <div className="text-main dark:text-mainDark flex items-center justify-center">
      <ClipLoader color="currentColor" size={size} />
    </div>
  );
}

export default LoadingSpinner;
