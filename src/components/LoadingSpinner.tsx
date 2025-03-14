import { ClipLoader } from "react-spinners";

function LoadingSpinner() {
  return (
    <div className="text-main dark:text-mainDark flex items-center justify-center">
      <ClipLoader color="currentColor" size={24} />
    </div>
  );
}

export default LoadingSpinner;
