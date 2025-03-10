import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Header from "./components/Header";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  refreshToken,
  selectAccessTokenStatus,
} from "./reducers/accessTokenSlice";
import MainPage from "./pages/MainPage";
import MoviePage from "./pages/MoviePage";
import ReviewsPage from "./pages/ReviewsPage";
import ReviewPage from "./pages/ReviewPage";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const tokenStatus = useAppSelector(selectAccessTokenStatus);
  if (tokenStatus === "idle") {
    dispatch(refreshToken());
  } else if (tokenStatus === "rejected") {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshToken());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<MainPage />} />
          <Route
            path="/reviews/*"
            element={
              <Routes>
                <Route
                  path="/new"
                  element={
                    <ProtectedRoutes>
                      <ReviewPage />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="/:id"
                  element={
                    <ProtectedRoutes>
                      <ReviewPage />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  index
                  element={
                    <ProtectedRoutes>
                      <ReviewsPage />
                    </ProtectedRoutes>
                  }
                />
              </Routes>
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
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
