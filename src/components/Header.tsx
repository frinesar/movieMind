import { Link } from "react-router";
import LoadingSpinner from "./LoadingSpinner";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectAccessTokenStatus,
  setAccessToken,
} from "../reducers/accessTokenSlice";
import { useLogoutMutation } from "../api/api";
import { openAuthModal } from "../reducers/authModalSlice";

function Header() {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const openModalHandler = () => dispatch(openAuthModal());
  const tokenStatus = useAppSelector(selectAccessTokenStatus);

  return (
    <div className="wrapper pt-6 font-main flex items-center justify-between select-none">
      <Link to="/">
        <p className="font-bold text-3xl">MovieMind</p>
        <p className="font-medium -mt-2 ">
          Watch. <span className="text-accent">Feel.</span> Write.
        </p>
      </Link>

      <div className="flex items-center">
        {tokenStatus === "fulfilled" && (
          <>
            <Link to="/reviews">Reviews</Link>
            <svg
              color="red"
              onClick={() => {
                logout();
                dispatch(setAccessToken({ token: "", status: "idle" }));
              }}
              height={40}
              width={40}
            >
              <use href="/icons.svg#logout" />
            </svg>
          </>
        )}
        {(tokenStatus === "idle" || tokenStatus === "rejected") && (
          <>
            <svg
              color="#1e1e1e"
              onClick={() => {
                console.log("clicked");
                openModalHandler();
              }}
              height={40}
              width={40}
            >
              <use href="/icons.svg#login" />
            </svg>
          </>
        )}
        {tokenStatus === "pending" && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default Header;
