const About = () => {
  return (
    <div className="">
      <div className="relative">
        <div className="bg-[#0facce] top-0 bottom-0 h-screen left-0 lg:w-[30rem] w-[5rem] absolute drop-shadow-lg"></div>
        <div className="bg-[#17445b] lg:h-[30rem] h-[10rem] lg:w-[20rem] w-[5rem] absolute lg:ml-[15rem] lg:m-[10rem] m-[3rem]  lg:rounded-tl-[12%] rounded-tl-3xl lg:rounded-br-[12%] rounded-br-3xl drop-shadow-lg"></div>
        <img
          src="https://th.bing.com/th/id/OIG1.AuCGNtK.2Yssa.1kcFOd?w=1024&h=1024&rs=1&pid=ImgDetMain"
          alt="logo"
          className="lg:h-[20rem] h-[5rem] drop-shadow-lg absolute lg:ml-[20rem] ml-[6rem] lg:mt-[15rem] mt-[5rem] rounded-tr-3xl rounded-bl-3xl z-10"
        />
      </div>
      <div className="flex justify-center">
        <span className="lg:text-[3rem] font-semibold text-[#0facce] lg:ml-[30rem] ml-[6rem] mt-[17rem] wide:landscape:mt-[7rem]">
          <p>Thank You For Visiting</p>
          <p>My Blog Website</p>
          <small className="lg:text-lg text-black">
            I created this project to enhance my skill as a front-end developer.
          </small>
        </span>
      </div>
    </div>
  );
};

export default About;
