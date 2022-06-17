import { useState } from "react";
import ReqLabel from "../ReqLabel";

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const PasswordInput = ({ password, setPassword }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handlePasswordChange = (event) => {
    const input = event.target.value;
    setPassword(input);
  };

  return (
    <div className={`flex flex-col gap-2 w-full`}>
      <div className={`w-full flex gap-2 items-center`}>
        <input
          className={`bg-dark-black text-white pt-5 pb-5 pl-12 pr-12 w-full border-1 border-primary`}
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
          autoComplete="off"
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <div>
          {PASSWORD_REGEX.test(password) === false ? (
            <i className={`material-symbols-rounded text-rose-600`}>Error</i>
          ) : PASSWORD_REGEX.test(password) === true ? (
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
            PASSWORD_REGEX.test(password) ? "check_circle" : "error"
          }`}
          req={`${
            PASSWORD_REGEX.test(password)
              ? "Looks Good"
              : "Minimum 8 alpha-numeric characters"
          }`}
          color={`${
            PASSWORD_REGEX.test(password) ? "text-primary" : "text-rose-600"
          }`}
        />
      </div>
    </div>
  );
};

export default PasswordInput;
