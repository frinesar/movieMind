import { Link } from "react-router";
import LoadingSpinner from "./LoadingSpinner";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectAccessTokenStatus,
  setAccessToken,
} from "../reducers/accessTokenSlice";
import { useLogoutMutation } from "../api/api";
import { openAuthModal } from "../reducers/authModalSlice";
import { useEffect, useState } from "react";

function Header() {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const openModalHandler = () => dispatch(openAuthModal());
  const tokenStatus = useAppSelector(selectAccessTokenStatus);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("theme");
    if (!savedMode) {
      localStorage.setItem("theme", "light");
    }
    return savedMode === "light" ? false : true;
  });
  useEffect(() => {
    document.querySelector("html")?.classList.toggle("dark", darkMode);
    localStorage.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <header
      className={`backdrop-blur-xl bg-background/80 dark:bg-backgroundDark/80 sticky top-0 z-50 transition-colors`}
    >
      <div
        className={`wrapper font-main flex items-center py-4 justify-between select-none text-main dark:text-mainDark`}
      >
        <Link to="/">
          <p className="font-bold text-xl">MovieMind</p>
          <p className="font-medium -mt-2 ">
            Watch. <span className="text-accent">Feel.</span> Write.
          </p>
        </Link>

        <div className="flex items-center gap-x-2.5">
          {tokenStatus === "fulfilled" && (
            <Link to="/reviews" className="font-medium">
              Reviews
            </Link>
          )}
          <Link to="/search">
            <svg height={24} width={24} onClick={() => console.log("search")}>
              <use href="/icons.svg#search" />
            </svg>
          </Link>
          <svg height={24} width={24} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <use href="/icons.svg#dark_mode" />
            ) : (
              <use href="/icons.svg#light_mode" />
            )}
          </svg>
          {tokenStatus === "fulfilled" && (
            <svg
              onClick={() => {
                logout();
                dispatch(setAccessToken({ token: "", status: "idle" }));
              }}
              height={24}
              width={24}
            >
              <use href="/icons.svg#logout" />
            </svg>
          )}
          {(tokenStatus === "idle" || tokenStatus === "rejected") && (
            <>
              <svg
                onClick={() => {
                  openModalHandler();
                }}
                height={24}
                width={24}
              >
                <use href="/icons.svg#login" />
              </svg>
            </>
          )}
          {tokenStatus === "pending" && <LoadingSpinner />}
        </div>
      </div>
    </header>
  );
}

export default Header;
