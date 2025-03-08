import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router";

import Header from "./components/Header";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  refreshToken,
  selectAccessTokenStatus,
} from "./reducers/accessTokenSlice";
import AuthModal from "./components/AuthModal";
import { selectAuthModalIsOpen } from "./reducers/authModalSlice";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const tokenStatus = useAppSelector(selectAccessTokenStatus);
  if (tokenStatus === "idle") {
    dispatch(refreshToken());
  }

  if (tokenStatus === "rejected") {
    console.log("Давай сюда пароль ежжжи");
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshToken());
  }, []);
  const isOpenAuthModal = useAppSelector(selectAuthModalIsOpen);

  return (
    <BrowserRouter>
      <Header />
      {isOpenAuthModal && <AuthModal />}
      <Routes>
        <Route
          index
          element={
            <div>
              Main
              <Link to="/reviews">To reviews</Link>
            </div>
          }
        />
        <Route
          path="/reviews/*"
          element={
            <ProtectedRoutes>
              <div>Reviews</div>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoutes>
              <div>Reviews</div>
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
