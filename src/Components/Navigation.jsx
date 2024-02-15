import { useContext } from "react";
import logo from "../img/Design.png";
import { MyContext } from "../Context/MyContext";
import { FaBars, FaRegUserCircle, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
// import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

// (logo) https://th.bing.com/th/id/OIG1.AuCGNtK.2Yssa.1kcFOd?w=1024&h=1024&rs=1&pid=ImgDetMain

const Navigation = ({ sidebar, setSidebar, user }) => {
  const { isMobile } = useContext(MyContext);
  // const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/auth");
    toast.success("Logout Successfully");
  };

  return (
    <div className="">
      <div className="lg:flex lg:justify-between lg:items-center lg:pl-4 lg:pr-6">
        <div className="flex justify-between">
          <div className=" p-1">
            <img src={logo} alt="logo" className="h-[60px] w-[130px]" />
          </div>
          {isMobile ? (
            <div className="p-6">
              <FaBars onClick={() => setSidebar(!sidebar)} className="size-5" />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="lg:flex-row flex flex-col items-center font-semibold lg:gap-[4rem]">
          <NavLink
            to="/"
            className="hover:bg-[#0facce] hover:text-white p-2.5 rounded-sm transition ease-in-out duration-150 text-center w-full"
          >
            <button className="">Home</button>
          </NavLink>
          <NavLink
            to="/blogs"
            className="hover:bg-[#0facce] hover:text-white p-2.5 rounded-sm transition ease-in-out duration-150 text-center w-full"
          >
            <button className="">Blogs</button>
          </NavLink>
          <NavLink
            to="/create"
            className="hover:bg-[#0facce] hover:text-white p-2.5 rounded-sm transition ease-in-out duration-150 text-center w-full"
          >
            <button className="">Create</button>
          </NavLink>
          <NavLink
            to="/about"
            className="hover:bg-[#0facce] hover:text-white p-2.5 rounded-sm transition ease-in-out duration-150 text-center w-full"
          >
            <button className="">About</button>
          </NavLink>
        </div>

        {user ? (
          <>
            <div className="lg:flex gap-3">
              <div className="flex items-center gap-1 justify-center w-full p-2.5">
                <FaRegUserCircle />
                <h1 className="">{user?.displayName}</h1>
              </div>
              <button
                className="lg:m-0 m-auto flex font-semibold hover:bg-[#0facce] hover:text-white p-2.5 rounded-sm transition ease-in-out duration-150"
                onClick={handleSignOut}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <NavLink
              to="/auth"
              className="justify-center lg:m-0 m-auto flex font-semibold hover:bg-[#0facce] hover:text-white p-2.5 rounded-sm transition ease-in-out duration-150"
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
