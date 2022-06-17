import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import Notification from "../Notification";
import TagInput from "../TagInput";
import ReqLabel from "../ReqLabel";
import Loading from "../Loading";

const CREATE_POST_URL = "/api/posts";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const { auth } = useAuth();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const username = auth.username;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      /* Handling Some Error */
      if (content.length > 10000 || title.length > 20)
        throw new Error("Character limit reached");
      if (!tags.length > 0) throw new Error("Atleast 1 Tag is required");
      if (!content.length > 0) throw new Error("Content Empty");
      if (!title.length > 0) throw new Error("Title Empty");

      const response = await axiosPrivate.post(
        CREATE_POST_URL,
        JSON.stringify({ title, content, tags, username })
      );

      setTitle("");
      setContent("");
      setTags([]);
      setIsSuccess(true);
      setTimeout(() => navigate("/", { replace: true }), 2000);
    } catch (error) {
      setIsError(true);
      setErrMsg(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(false);
      setIsError(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [isSuccess, isError]);

  return !isLoading ? (
    <div
      className={`flex lg:h-5/6 lg:w-4/5 md:w-full md:h-full gap-12 justify-center items-center pl-6 pr-6  `}
    >
      {isSuccess ? (
        <Notification msg={`SUCCESS!\nPost Created!`} color={`bg-primary`} />
      ) : isError ? (
        <Notification msg={`ERROR!\n${errMsg}`} color={`bg-rose-600`} />
      ) : (
        ""
      )}
      <div className={`flex flex-col gap-6 lg:w-1/2 md:w-3/4`}>
        <form className={`flex flex-col gap-6`} onSubmit={handleSubmit}>
          <input
            className={`bg-dark-black text-white pt-5 pb-5 pl-12 pr-12 w-full border-1 border-primary`}
            placeholder="Enter post title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className={`bg-dark-black text-white pt-5 pb-5 pl-12 pr-12 w-full border-1 border-primary`}
            placeholder="Enter post content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          {content.length >= 10000 ? (
            <ReqLabel
              iconName="report"
              color="text-red-500"
              req="Maximum Characters Limit Reached"
            />
          ) : (
            ""
          )}

          <TagInput tags={tags} setTags={(value) => setTags(value)} />

          <div className={`flex justify-between flex-col md:flex-row gap-4`}>
            <button
              className={`text-black bg-primary text-xl pt-4 pb-4 pl-12 pr-12 active:bg-black active:text-primary`}
              disabled={isLoading ? true : false}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      A
    </div>
  ) : (
    <div className={`flex justify-center items-center h-screen`}>
      <Loading />
    </div>
  );
};

export default CreatePost;
