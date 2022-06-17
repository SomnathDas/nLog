/* Imports */
import { useEffect, useState } from "react";
import axios from "../../api/axios";

/* Stylesheets */
import "../../styles/SignUpForm.css";

/* Form Components */
import UsernameInput from "../FormComponents/UsernameInput";
import EmailInput from "../FormComponents/EmailInput";
import PasswordInput from "../FormComponents/PasswordInput";
import ConfirmPasswordInput from "../FormComponents/ConfirmPasswordInput";

/* Other Components */
import Button from "../Button";
import Notification from "../Notification";

/* Regex for Verification */
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const USERNAME_REGEX =
  /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

/* Constants */
const REGISTER_URL = "/api/register";

/* Main Component */
const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [isSuccess, setIsSuccess] = useState("");
  const [isError, setIsError] = useState("");

  /* Form Submission */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailTest = EMAIL_REGEX.test(email);
    const passwordTest = PASSWORD_REGEX.test(password);
    const usernameTest = USERNAME_REGEX.test(username);
    if (!emailTest || !passwordTest || !usernameTest) {
      setIsError(true);
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          withCredentials: true,
        }
      );
      if (response.status === 400) setIsError(true);
      setIsSuccess(true);
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPass("");
    } catch (err) {
      if (!err?.response) {
        setIsError(true);
      }
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
        <Notification
          msg={`SUCCESS!\nYou can Log-in now`}
          color={`bg-primary`}
        />
      ) : isError ? (
        <Notification
          msg={`ERROR!\nSomething went wrong`}
          color={`bg-rose-600`}
        />
      ) : (
        ""
      )}
      <div
        className={`side_bg h-full lg:w-1/4 lg:flex justify-center items-center hidden border-t-2 border-b-2 border-primary shadow shadowMorbinTime`}
      >
        <span
          className={
            "span font-bold text-white text-5xl -rotate-90 select-none"
          }
        >
          Sign Up
        </span>
      </div>
      <div className={`flex flex-col gap-6 lg:w-1/2 md:w-3/4`}>
        <div className={`text-center lg:text-left`}>
          <h1 className={`title text-5xl text-white font-bold`}>Welcome</h1>
          <h2 className={`subtitle text-xl text-dark-gray`}>
            Let's sign you up quickly
          </h2>
        </div>
        <form className={`flex flex-col gap-6`} onSubmit={handleSubmit}>
          <UsernameInput
            username={username}
            setUsername={(value) => setUsername(value)}
          />
          <EmailInput email={email} setEmail={(value) => setEmail(value)} />
          <PasswordInput
            password={password}
            setPassword={(value) => setPassword(value)}
          />
          <ConfirmPasswordInput
            password={password}
            confirmPass={confirmPass}
            setConfirmPass={(value) => setConfirmPass(value)}
          />
          <div className={`flex justify-between flex-col md:flex-row gap-4`}>
            <Button text="Submit" />
            <div className={``}>
              <h2 className={`text-white`}>already have an account?</h2>
              <a href="/login" className={`text-primary`}>
                log-in
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
