import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../img/logo.png";

const Footer = () => {
  return (
    <div className="pr-12 pl-12 pt-3 bg-[#226677]  pb-[80px] text-white lg:text-start text-center">
      <img
        src={logo}
        alt="logo"
        className="h-[110px] w-[130px] m-auto lg:m-0"
      />
      <div className="flex lg:flex-row flex-col lg:justify-between justify-center items-center lg:items-start lg:py-0 py-2 gap-3">
        <p className="font-semibold lg:text-lg italic">
          Connect and build relationships with your peers.
        </p>
        <div className="uppercase flex flex-col lg:block">
          <p className="font-semibold lg:text-lg text-xs">
            Updated consistently with new posts which direct to your inbox
          </p>
          <input
            type="text"
            name="subscribe"
            placeholder="YOUR E-MAIL ..."
            className="border lg:p-2 p-1 mr-3 lg:w-[26rem] w-full mt-3"
          />
          <button className="border uppercase pr-6 pl-6 lg:p-2 p-1 mt-2 lg:mt-0">
            Subscribe
          </button>
        </div>
        <div>
          <p className="font-semibold lg:text-lg text-xs">FOLLOW US</p>
          <div className="flex gap-4 mt-3">
            <FaInstagram className="size-5" />
            <FaFacebook className="size-5" />
            <FaXTwitter className="size-5" />
          </div>
        </div>

        <div>
          <p className="font-semibold lg:text-lg text-xs">CALL US</p>
          <p className="mt-2">095 9294 5431</p>
        </div>
      </div>
      <hr className="mt-10" />
      <p>Copyright @ 2024 - All Right Reserved.</p>
    </div>
  );
};

export default Footer;
