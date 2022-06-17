const Button = ({ text }) => {
  return (
    <button
      className={`text-black bg-primary text-xl pt-4 pb-4 pl-12 pr-12 active:bg-black active:text-primary`}
    >
      {text.toUpperCase()}
    </button>
  );
};

export default Button;
