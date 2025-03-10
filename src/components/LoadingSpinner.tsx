import { ClipLoader } from "react-spinners";

function LoadingSpinner() {
  return (
    <div className="text-main dark:text-mainDark flex items-center justify-center">
      <ClipLoader color="currentColor" size={40} />
    </div>
  );
}

export default LoadingSpinner;
