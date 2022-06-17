import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import "../styles/Navbar.css";
import NavBtn from "./NavBtn";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const username = auth?.username ? auth.username : "guest";
  const userInitial = auth?.username
    ? auth?.username.trim().slice(0, 1).toUpperCase()
    : "G";

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav
      className={`lg:h-full lg:w-24 w-11/12 h-20 lg:pt-12 lg:pb-12 pl-2 pr-2 border-primary border-1 fixed bg-dark-black z-50 self-center`}
    >
      <ul
        className={`w-full h-full flex lg:flex-col items-center justify-center lg:justify-between lg:gap-0 gap-8`}
      >
        <li className={`flex lg:flex-col lg:gap-6 gap-8 items-center`}>
          <div className={`flex lg:flex-col justify-center items-center gap-2`}>
            <div
              className={`profile bg-primary md:h-14 md:w-14 w-12 h-12 flex justify-center items-center`}
            >
              <h2 className={`md:text-3xl text-2xl`}>{userInitial}</h2>
            </div>
            <h2 className={` lg:hidden md:block hidden text-white`}>
              {username}
            </h2>
          </div>

          <NavBtn title={"search"} icon_name={"search"} link={"/search"} />
          <NavBtn
            title={"popular"}
            icon_name={"auto_awesome"}
            link={"/popular"}
          />
        </li>
        {auth.accessToken ? (
          <>
            <li>
              <NavBtn
                title={"create"}
                icon_name={"add_circle_outline"}
                link={"/create"}
              />
            </li>
            <li>
              <button
                className={`flex gap-2 lg:flex-col items-center  text-white group`}
                onClick={signOut}
              >
                <i
                  className={`material-symbols-rounded lg:text-5xl text-3xl text-primary group-hover:opacity-40 group-active:opacity-40`}
                >
                  logout
                </i>
                <span
                  className={`  group-hover:text-primary group-active:text-primary md:block hidden`}
                >
                  logout
                </span>
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavBtn title={"login"} icon_name={"login"} link={"/login"} />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
