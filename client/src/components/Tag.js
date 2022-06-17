const Tag = ({ title }) => {
  return (
    <div
      className={`text-primary rounded-full border-primary border-2 p-2  text-center md:text-base text-sm`}
    >
      <p>#{title}</p>
    </div>
  );
};

export default Tag;
