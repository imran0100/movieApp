import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { setUserEmail } from "../Redux/authSlice";
import Home from "./Home";
import { auth, provider } from "../firebase";

function SignIn() {
  const { userEmail } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      dispatch(setUserEmail(data.user.email));
      localStorage.setItem("email", data.user.email);
    });
  };

  useEffect(() => {
    dispatch(setUserEmail(localStorage.getItem("email")));
  }, [dispatch]);

  return (
    <div>
      {userEmail ? (
        <Home />
      ) : (
        <button onClick={handleClick}>Signin With Google</button>
      )}
    </div>
  );
}

export default SignIn;
