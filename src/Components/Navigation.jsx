import { useContext } from "react";
import logo from "../img/Design.png";
import { MyContext } from "../Context/MyContext";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

// (logo) https://th.bing.com/th/id/OIG1.AuCGNtK.2Yssa.1kcFOd?w=1024&h=1024&rs=1&pid=ImgDetMain

const Navigation = ({ sidebar, setSidebar }) => {
  const { isMobile } = useContext(MyContext);

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
        <div className="lg:flex lg:flex-row flex flex-col font-semibold lg:gap-[4rem]">
          <div className="hover:bg-[#0facce] hover:text-white p-2.5 rounded-lg transition ease-in-out duration-150 text-center w-full">
            <button className="">Home</button>
          </div>
          <div className="hover:bg-[#0facce] hover:text-white p-2.5 rounded-lg transition ease-in-out duration-150 text-center w-full">
            <button className="">Blogs</button>
          </div>
          <div className="hover:bg-[#0facce] hover:text-white p-2.5 rounded-lg transition ease-in-out duration-150 text-center w-full">
            <button className="">Create</button>
          </div>
          <div className="hover:bg-[#0facce] hover:text-white p-2.5 rounded-lg transition ease-in-out duration-150 text-center w-full">
            <button className="">About</button>
          </div>
        </div>

        <NavLink
          to="/auth"
          className="justify-center lg:m-0 m-auto flex font-semibold hover:bg-[#0facce] hover:text-white p-2.5 rounded-lg transition ease-in-out duration-150"
        >
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
