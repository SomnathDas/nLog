import Tag from "./Tag";
import "../styles/Glitch.css";

const Feed = ({
  title,
  content,
  date_short,
  date_long,
  username,
  post_url,
  tags,
  likes,
}) => {
  return (
    <article
      className={`w-full flex md:flex-row flex-col gap-2 lg:pb-12 pb-5  border-b-1 border-gray-700`}
    >
      <div
        className={`text-white md:flex-col md:flex hidden justify-center items-center gap-6`}
      >
        <h2 className={`text-3xl font-bold text-center`}>{date_short}</h2>
        <div className={`flex gap-2`}>
          <i className={`material-symbols-rounded text-primary`}>favorite</i>
          <h2>{likes.length}</h2>
        </div>
      </div>

      <div className={`w-full flex flex-col gap-3`}>
        <div
          className={`flex flex-col gap-2 cursor-pointer `}
          onClick={() => window.open(post_url)}
        >
          <h1
            data-text={title}
            className={`text-primary md:text-4xl text-2xl font-bold hover:bg-primary active:bg-primary active:text-black hover:text-black pt-2 pb-2 glitch`}
          >
            {title}
          </h1>
          <h2 className={`text-white font-bold `}>by @{username}</h2>
          <p
            className={`text-white md:text-xl text-base hover:opacity-80 active:opacity-80 transition-opacity break-words`}
          >
            {content.slice(0, 200)}{" "}
            <a className={`text-primary`}>...read more</a>
          </p>
        </div>
        <div className={`text-white flex md:hidden gap-6`}>
          <h2 className={` font-bold`}>{date_long}</h2>
          <div className={`flex gap-2`}>
            <i className={`material-symbols-rounded`}>favorite</i>
            <h2>{likes.length}</h2>
          </div>
        </div>
        <div className={` gap-2 flex flex-wrap pl-4 pr-4`}>
          {tags?.map((elem, index) => {
            return (
              <Tag
                key={index + Math.floor(Math.random() * 900) + 1}
                title={elem}
              />
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default Feed;
