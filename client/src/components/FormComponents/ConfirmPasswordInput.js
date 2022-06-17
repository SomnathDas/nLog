import { useEffect, useState } from "react";
import ReqLabel from "../ReqLabel";

const ConfirmPasswordInput = ({ password, confirmPass, setConfirmPass }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [passwordVerify, setPasswordVerify] = useState(false);

  const handlePasswordChange = (event) => {
    const input = event.target.value;
    setConfirmPass(input);
  };

  useEffect(() => {
    if (confirmPass === password && confirmPass.length > 0) {
      setPasswordVerify(true);
    } else {
      setPasswordVerify(false);
    }
  }, [password, confirmPass]);

  return (
    <div className={`flex flex-col gap-2 w-full`}>
      <div className={`w-full flex gap-2 items-center`}>
        <input
          className={`bg-dark-black text-white pt-5 pb-5 pl-12 pr-12 w-full border-1 border-primary`}
          placeholder="Confirm password"
          type="password"
          value={confirmPass}
          onChange={handlePasswordChange}
          required
          autoComplete="off"
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <div>
          {passwordVerify === false ? (
            <i className={`material-symbols-rounded text-rose-600`}>Error</i>
          ) : passwordVerify === true ? (
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
          iconName={`${passwordVerify ? "check_circle" : "error"}`}
          req={`${passwordVerify ? "Looks Good" : "Same as previous field"}`}
          color={`${passwordVerify ? "text-primary" : "text-rose-600"}`}
        />
      </div>
    </div>
  );
};

export default ConfirmPasswordInput;
