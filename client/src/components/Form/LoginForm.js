import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/LoginForm.css";
import Button from "../Button";
import Notification from "../Notification";

import axios from "../../api/axios";

const LOGIN_URL = "/api/login";

const LoginForm = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  // Get where the user came from
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.token;
      const username = response?.data?.username;
      setAuth({ accessToken, username });
      setEmail("");
      setPassword("");
      setIsSuccess(true);
      /* Replaces the login page from where 
      the user came from after logging in */
      navigate(from, { replace: true });
    } catch (err) {
      setIsError(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(false);
      setIsError(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [isSuccess, isError]);

  return (
    <div
      className={`flex lg:h-5/6 lg:w-4/5 md:w-full md:h-full gap-12 justify-center items-center pl-6 pr-6  `}
    >
      {isSuccess ? (
        <Notification msg={`SUCCESS!\nWelcome user!`} color={`bg-primary`} />
      ) : isError ? (
        <Notification
          msg={`ERROR!\nSomething went wrong`}
          color={`bg-rose-600`}
        />
      ) : (
        ""
      )}
      <div
        className={`side_bg h-full lg:w-1/4 lg:flex justify-center items-center hidden border-t-2 border-b-2 border-primary-green shadow shadowMorbinTime`}
      >
        <span
          className={
            "span font-bold text-white text-5xl -rotate-90 select-none"
          }
        >
          Login
        </span>
      </div>
      <div className={`flex flex-col gap-6 lg:w-1/2 md:w-3/4`}>
        <div className={`text-center lg:text-left`}>
          <h1 className={`title text-5xl text-white font-bold `}>Welcome</h1>
          <h2 className={`subtitle text-xl text-dark-gray`}>
            Let's log you in quickly
          </h2>
        </div>
        <form className={`flex flex-col gap-6`} onSubmit={handleSubmit}>
          <input
            className={`bg-dark-black text-white pt-5 pb-5 pl-12 pr-12 w-full border-1 border-primary`}
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={inputRef}
            required
          />
          <input
            className={`bg-dark-black text-white pt-5 pb-5 pl-12 pr-12 w-full border-1 border-primary`}
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className={`flex justify-between flex-col md:flex-row gap-4`}>
            <Button text="Submit" />
            <div className={``}>
              <h2 className={`text-white`}>don't have an account?</h2>
              <a href="/signup" className={`text-primary`}>
                sign-in
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
