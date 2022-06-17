import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import axios from "axios";
import ReqLabel from "../ReqLabel";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const EmailInput = ({ email, setEmail }) => {
  const [emailFound, setEmailFound] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const emailSearch = (input) => {
    setIsLoading(true);
    axios
      .get(`/api/user/email?email=${input}`)
      .then((result) => {
        if (result.data["error"] === true) {
          setEmailFound(0);
        } else {
          setEmailFound(1);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setEmailFound(-1);
        setIsLoading(false);
      });
  };

  const handleEmailSearch = useCallback(_.debounce(emailSearch, 1000), []);

  const handleEmailChange = (event) => {
    const input = event.target.value;
    setEmail(input);
  };

  useEffect(() => {
    handleEmailSearch(email);
  }, [email]);

  const emailVerification = () => {
    if (emailFound === 1 && EMAIL_REGEX.test(email)) {
      return 0;
    }

    if (emailFound === 0 && EMAIL_REGEX.test(email)) {
      return 1;
    }

    return 0;
  };

  return (
    <div className={`flex flex-col gap-2 w-full`}>
      <div className={`w-full flex gap-2 items-center`}>
        <input
          className={`bg-dark-black text-white pt-5 pb-5 pl-12 pr-12 w-full border-1 border-primary`}
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          autoComplete="off"
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <div>
          {isLoading ? (
            <i className={`material-symbols-rounded text-primary`}>
              Replay_Circle_Filled
            </i>
          ) : emailVerification() === 0 ? (
            <i className={`material-symbols-rounded text-rose-600`}>Error</i>
          ) : emailVerification() === 1 ? (
            <i className={`material-symbols-rounded text-primary`}>
              Check_Circle
            </i>
          ) : (
            <i className={`material-symbols-rounded text-primary`}>Circle</i>
          )}
        </div>
      </div>
      <div
        className={`flex-col gap-1 pt-2 pb-2 ${
          isInputFocused ? "flex" : "hidden"
        }`}
      >
        <ReqLabel
          iconName={`${emailVerification() ? "check_circle" : "error"}`}
          req={`${
            EMAIL_REGEX.test(email) && emailFound === 0
              ? "Looks Good"
              : EMAIL_REGEX.test(email) && emailFound === 1
              ? "Email already registered"
              : "Enter proper Email"
          }`}
          color={`${emailVerification() ? "text-primary" : "text-rose-600"}`}
        />
      </div>
    </div>
  );
};

export default EmailInput;
