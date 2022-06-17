import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import Loading from "./Loading";

const DetailedFeed = () => {
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  const [firstLetter, setFirstLetter] = useState();

  const getPost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/posts/find/${postId}`);
      setPost(response.data.data[0]);
      setFirstLetter(
        response.data.data[0].content.trim().slice(0, 1).toUpperCase()
      );
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={`flex justify-center items-center h-screen`}>
          <Loading />
        </div>
      ) : isError ? (
        <div className={`h-screen flex justify-center items-center`}>
          <h1 className={`text-white text-center text-2xl`}>Post not found</h1>
        </div>
      ) : (
        <div className={`flex flex-col p-16 gap-4`}>
          <h1 className={`text-primary text-4xl font-semibold`}>
            {post.title}
          </h1>

          <div className={`flex`}>
            <div>
              <p className={`text-dark-gray`}>
                written by @{post.username || post.user_id}
              </p>
              <p className={`text-dark-gray`}>on {post.createdAt}</p>
            </div>
          </div>
          <p className={`text-white break-words whitespace-pre-wrap`}>
            <span className={`text-4xl`}>{firstLetter}</span>
            {post.content.trim().slice(1)}
          </p>
        </div>
      )}
    </>
  );
};

export default DetailedFeed;
