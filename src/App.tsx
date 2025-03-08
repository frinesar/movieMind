import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Header from "./components/Header";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  refreshToken,
  selectAccessTokenStatus,
} from "./reducers/accessTokenSlice";
import MainPage from "./pages/MainPage";

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

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<MainPage />} />
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
          <Route path="/movie/:id" element={<div>movie</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
