import { useState } from "react";
import ReqLabel from "./ReqLabel";

const TagInput = ({ tags, setTags }) => {
  const [input, setInput] = useState("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const inputHandler = (e) => {
    const { value } = e.target;
    if (tags.length >= 4) {
      return 0;
    }
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key, keyCode, code } = e;
    const trimmedInput = input.trim();

    if (
      keyCode == 188 ||
      keyCode == 32 ||
      keyCode == 13 ||
      key == "," ||
      code == "Comma" ||
      (key == "Enter" &&
        trimmedInput.length >= 0 &&
        trimmedInput.length <= 20 &&
        !tags.includes(trimmedInput))
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };
  return (
    <>
      <div
        className={`w-full flex flex-wrap bg-dark-black text-white gap-2 border-primary border-1 pt-5 pb-5 pl-12 pr-12`}
      >
        {tags.map((tag, index) => (
          <div className={`bg-primary text-black p-1 rounded-sm`} key={index}>
            {tag}
          </div>
        ))}
        <input
          placeholder="Enter tags"
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onChange={inputHandler}
          value={input}
          className={`bg-dark-black text-white`}
        />
      </div>
      {tags.length >= 4 ? (
        <ReqLabel
          req="Maximum Limit Reached"
          iconName="report"
          color="text-yellow-500"
        />
      ) : input.trim().length >= 20 ? (
        <ReqLabel
          req="Maximum Character Limit Reached"
          iconName="report"
          color="text-yellow-500"
        />
      ) : (
        ""
      )}
    </>
  );
};

export default TagInput;
