import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [signUp, setSignUp] = useState(false);
  const [state, setState] = useState(initialState);
  const { name, email, password, confirmPassword } = state;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("Login Successfully");
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error("Password didn't match");
      }
      if (name && email && password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${name}` });
        toast.success("Registered Successfully");
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    }
    navigate("/");
  };

  return (
    <div className="m-auto flex justify-center wide:landscape:overflow-y-scroll wide:landscape:h-screen">
      <div className="flex lg:h-[30rem] lg:w-[30rem] justify-center wide:landscape:h-[40rem]">
        <form
          onSubmit={handleAuth}
          className="text-center items-center flex flex-col"
        >
          <h1 className="mt-10 font-bold text-lg">{`${
            signUp ? "Create Account" : "Welcome Back"
          }`}</h1>
          <div className="flex flex-col gap-7 lg:w-[25rem] w-[20rem] mt-10">
            {signUp && (
              <div className="flex relative items-center space-x-7 p-1.5 border-b-2">
                <FaUser className="text-gray-400 absolute" />
                <input
                  type="text"
                  name="name"
                  value={name}
                  autoComplete="on"
                  placeholder="Name"
                  className="w-full focus:outline-none focus-visible:bg-none autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]"
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="flex relative items-center space-x-7 p-1.5 border-b-2">
              <FaEnvelope className="text-gray-400 absolute" />
              <input
                type="email"
                name="email"
                value={email}
                autoComplete="on"
                placeholder="Email"
                className="w-full focus:outline-none autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]"
                onChange={handleChange}
              />
            </div>
            <div className="flex relative items-center space-x-7 p-1.5 border-b-2">
              <FaLock className="text-gray-400 absolute" />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                className="w-full focus:outline-none"
                onChange={handleChange}
              />
            </div>
            {signUp && (
              <>
                <div className="flex relative items-center space-x-7 p-1.5 border-b-2">
                  <FaLock className="text-gray-400 absolute" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    className="w-full focus:outline-none"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col space-y-3 lg:w-[25rem] w-[20rem]">
            <button
              type="submit"
              className="mt-10  border rounded-lg p-2  bg-[#0facce] text-white z-1"
            >
              {`${signUp ? "Sign up" : "Log In"}`}
            </button>

            <div>or</div>

            <div
              className="border rounded-lg p-2 bg-transparent text-gray-400 cursor-pointer"
              onClick={() => setSignUp(!signUp)}
            >
              {`${signUp ? "Log In" : "Sign up"}`}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
