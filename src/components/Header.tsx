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
    <div className="wrapper pt-6 font-main flex items-center justify-between select-none text-main dark:text-mainDark">
      <Link to="/">
        <p className="font-bold text-3xl">MovieMind</p>
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
          <svg height={25} width={25} onClick={() => console.log("search")}>
            <use href="/icons.svg#search" />
          </svg>
        </Link>
        <svg height={25} width={25} onClick={() => setDarkMode(!darkMode)}>
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
            height={25}
            width={25}
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
              height={25}
              width={25}
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
