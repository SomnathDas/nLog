import { useEffect, useState, useCallback } from "react";
import axios from "../api/axios";
import _ from "lodash";
import Feed from "../components/Feed";
import getMonthAndDay from "../utils/getMonthAndDay";
import Loading from "../components/Loading";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchPost = async (searchTerm) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/posts/search?t=${searchTerm}`);
      setPosts(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostSearch = useCallback(_.debounce(searchPost, 1000), []);

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    handlePostSearch(searchText);
  }, [searchText]);

  return (
    <section className={`flex flex-col h-screen w-screen  p-10 gap-2`}>
      <div className={`flex flex-col gap-4 w-full`}>
        <h1
          className={`text-white lg:text-6xl md:text-4xl text-2xl font-bold text-center`}
        >
          Search
        </h1>
        <input
          type="search"
          value={searchText}
          placeholder={"Enter keywords to search"}
          onChange={handleSearchText}
          className={`bg-dark-black text-white pt-2 pb-2 pl-12 pr-12 w-full border-1 border-primary text-2xl`}
        />
      </div>
      {posts.length === 0 ? (
        <h2 className={`text-gray-500 text-2xl`}>No Result Found</h2>
      ) : (
        ""
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <div className={`lg:pb-12 flex flex-col gap-6 lg:pt-12 pt-5`}>
          {posts.map((elem) => {
            let date = getMonthAndDay(elem.createdAt);
            return (
              <Feed
                key={elem._id}
                date_short={`${date[0]} ${date[1]}`}
                date_long={date}
                post_url={`/posts/${elem._id}`}
                title={elem.title}
                username={elem.username || elem.user_id}
                tags={elem.tags}
                content={elem.content}
                likes={elem.likes}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Search;
