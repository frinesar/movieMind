import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useLoginMutation, useSignUpMutation } from "../api/api";
import LoadingSpinner from "./LoadingSpinner";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  closeAuthModal,
  selectAuthModalIsOpen,
} from "../reducers/authModalSlice";
import Button from "./Button";

function AuthModal() {
  const isOpen = useAppSelector(selectAuthModalIsOpen);
  const [loginTrigger, loginResult] = useLoginMutation();
  const [signUp, signUpResult] = useSignUpMutation();
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [isNewProfile, setIsNewProfile] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loginResult.isSuccess || signUpResult.isSuccess) {
      dispatch(closeAuthModal());
    }
  }, [loginResult.isSuccess, signUpResult.isSuccess]);

  if (!isOpen) {
    return null;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNewProfile) {
        await signUp(userData).unwrap();
      }
      await loginTrigger(userData).unwrap();
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <Modal closeModal={() => dispatch(closeAuthModal())}>
      {(loginResult.isLoading || signUpResult.isLoading) && (
        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-background/50 rounded-xl border-2 border-main">
          <LoadingSpinner />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="p-6 pb-2 border-2 rounded-xl border-main font-main text-main bg-background "
      >
        <p className="text-5xl text-center">
          {isNewProfile ? "Sign up" : "Login"}
        </p>
        <input
          required
          type="text"
          className=" mt-24 border-b-2 border-main rounded-xs p-1 "
          name=""
          placeholder="Username"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
        <div>
          <input
            required
            type="password"
            className="mt-5 border-b-2 border-main rounded-xs p-1"
            name=""
            placeholder="Password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>
        <div className="flex justify-center">
          <Button className="mt-6 mx-auto border-4">
            {isNewProfile ? "Sign up" : "Login"}
          </Button>
        </div>
        {loginResult.isError && (
          <p className="text-bad text-center mt-6">Invalid data. Try again</p>
        )}
        {signUpResult.isError && (
          <p className="text-bad text-center mt-6">Username already in use</p>
        )}
        {isNewProfile ? (
          <p className="text-xs text-center mt-6 select-none">
            Already have an account?{" "}
            <span
              className="font-bold underline cursor-pointer"
              onClick={() => setIsNewProfile(false)}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-xs text-center mt-6 select-none">
            Don’t have an account?{" "}
            <span
              className="font-bold underline cursor-pointer"
              onClick={() => setIsNewProfile(true)}
            >
              Sign up
            </span>
          </p>
        )}
      </form>
    </Modal>
  );
}

export default AuthModal;
