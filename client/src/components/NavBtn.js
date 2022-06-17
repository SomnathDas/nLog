import "../styles/NavBtn.css";

const NavBtn = ({ title, icon_name, link }) => {
  return (
    <a
      className={`flex gap-2 lg:flex-col items-center  text-white group`}
      href={link}
    >
      <i
        className={`material-symbols-rounded lg:text-5xl text-3xl text-primary group-hover:opacity-40 group-active:opacity-40`}
      >
        {icon_name}
      </i>
      <span
        className={`  group-hover:text-primary group-active:text-primary md:block hidden`}
      >
        {title}
      </span>
    </a>
  );
};

export default NavBtn;
