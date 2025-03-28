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
import ReviewEdit from "./components/ReviewEdit";
import ReviewNew from "./components/ReviewNew";
import SearchPage from "./pages/SearchPage";
import WishlistPage from "./pages/WishlistPage";

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
        <div className="pt-16">
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route
              path="/reviews/*"
              element={
                <Routes>
                  <Route
                    path="/new/:movieID"
                    element={
                      <ProtectedRoutes>
                        <ReviewNew />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="/:id"
                    element={
                      <ProtectedRoutes>
                        <ReviewEdit />
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
                  <WishlistPage />
                </ProtectedRoutes>
              }
            />
            <Route path="/movie/:id" element={<MoviePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
