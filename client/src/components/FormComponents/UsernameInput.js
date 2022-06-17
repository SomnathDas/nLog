import { useState, useCallback, useEffect, useRef } from "react";
import _ from "lodash";
import axios from "axios";
import ReqLabel from "../ReqLabel";

const USERNAME_REGEX =
  /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

const UsernameInput = ({ username, setUsername }) => {
  const [usernameFound, setUsernameFound] = useState(-1);

  const [isLoading, setIsLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [verifyUname, setVerifyUname] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const usernameSearch = (input) => {
    setIsLoading(true);
    axios
      .get(`/api/user?uname=${input}`)
      .then((result) => {
        if (result.data["error"] === true && input.length >= 3) {
          setUsernameFound(0);
        } else {
          setUsernameFound(1);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setUsernameFound(-1);
        setIsLoading(false);
      });
  };

  const handleUsernameSearch = useCallback(
    _.debounce(usernameSearch, 1000),
    []
  );

  const handleUsernameChange = (event) => {
    const input = event.target.value;
    setUsername(input);
  };

  useEffect(() => {
    handleUsernameSearch(username);
    if (USERNAME_REGEX.test(username)) {
      setVerifyUname(true);
    } else {
      setVerifyUname(false);
    }
  }, [username]);

  return (
    <div className={`flex flex-col gap-2 w-full`}>
      <div className={`w-full flex gap-2 items-center`}>
        <input
          className={`bg-dark-black text-white pt-5 pb-5 pl-12 pr-12 w-full border-1 border-primary`}
          placeholder="Enter your username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          required
          autoComplete="off"
          ref={inputRef}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <div>
          {isLoading ? (
            <i className={`material-symbols-rounded text-primary`}>
              Replay_Circle_Filled
            </i>
          ) : usernameFound === 1 && verifyUname === false ? (
            <i className={`material-symbols-rounded text-rose-600`}>Error</i>
          ) : usernameFound === 0 && verifyUname === true ? (
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
          iconName={`${
            usernameFound === 1
              ? "Error"
              : usernameFound === 0
              ? "Check_Circle"
              : "Circle"
          }`}
          req={`${
            usernameFound === 1
              ? "Username Not Available"
              : "Username available"
          }`}
          color={`${
            usernameFound === 1
              ? "text-rose-600"
              : usernameFound === 0
              ? "text-primary"
              : "text-dark-gray"
          }`}
        />
        <ReqLabel
          iconName={`${verifyUname ? "Check_Circle" : "Error"}`}
          req={`${"No space and starting or trailing underscores"}`}
          color={`${verifyUname ? "text-primary" : "text-rose-600"}`}
        />
      </div>
    </div>
  );
};

export default UsernameInput;
