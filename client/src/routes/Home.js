import { useEffect, useState } from "react";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import getMonthAndDay from "../utils/getMonthAndDay";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import Loading from "../components/Loading";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setIsLoading(true);
    try {
      if (page <= lastPage) {
        const response = await axios.get(`/api/posts?limit=4&page=${page}`);
        setPage(page + 1);
        setLastPage(response.data.pageCount);
        setPosts(() => [...posts, ...response.data.data]);
      }
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    getPosts();
    setIsFetching(false);
  };

  return (
    <section
      className={`h-screen flex flex-col-reverse lg:flex-row lg:items-start `}
    >
      <BottomScrollListener onBottom={() => setIsFetching(true)}>
        <Navbar />
        <section className={`h-full flex flex-col lg:pl-24 `}>
          <div
            className={` lg:w-32 flex flex-col justify-center items-center pt-8`}
          >
            <div className={`border-t-4 border-primary w-8`}></div>
            <h3 className={`text-2xl text-white `}>Latest</h3>
          </div>

          <div className={`lg:pb-12 p-12 flex flex-col gap-6 pb-24`}>
            {posts.map((elem) => {
              let date = getMonthAndDay(elem.createdAt);
              return (
                <Feed
                  key={elem._id}
                  date_short={`${date[0]} ${date[1]}`}
                  date_long={`${date[0]} ${date[1]} ${date[2]}`}
                  post_url={`/posts/${elem._id}`}
                  title={elem.title}
                  username={elem.username || elem.user_id}
                  tags={elem.tags}
                  content={elem.content}
                  likes={elem.likes}
                />
              );
            })}
            {isLoading ? <Loading /> : ""}
            {page > lastPage ? (
              <div className={`flex justify-center items-center gap-2`}>
                <i className="material-symbols-rounded text-primary">
                  Verified
                </i>
                <h2
                  className={`text-primary text-2xl text-center animate-pulse`}
                >
                  You've seen em all
                </h2>
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      </BottomScrollListener>
    </section>
  );
};

export default Home;
