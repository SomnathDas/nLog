import { useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const LikeButton = ({ post, postId }) => {
  const [error, setError] = useState(false);
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likes.includes(auth.id));

  const updateLikes = async () => {
    setIsLoading(true);
    if (post.likes.includes(auth.id)) return 0;
    try {
      const response = await axios.put(
        `/api/posts/likes`,
        {
          user_id: auth.id,
          post_id: post._id,
        },
        {
          withCredentials: true,
        }
      );
      setIsLiked(true);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return auth.accessToken ? (
    <button
      className={`text-black bg-primary md:text-lg text-sm pt-2 pb-2 pl-6 pr-6 rounded-sm active:bg-black active:text-primary flex gap-2 items-center justify-center disabled:opacity-40 disabled:active:bg-primary disabled:active:text-black`}
      disabled={isLiked}
      onClick={updateLikes}
    >
      {isLoading ? (
        <>
          <i className={`material-symbols-rounded animate-spin`}>next_plan</i>
          Liking
        </>
      ) : (
        <>
          <i className={`material-symbols-rounded`}>favorite</i>
          {isLiked ? "Liked" : "Like"}
        </>
      )}
    </button>
  ) : (
    ""
  );
};

export default LikeButton;
