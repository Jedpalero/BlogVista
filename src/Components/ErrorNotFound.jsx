import logo from "../img/BlogVistaLogo.png";

const ErrorNotFound = () => {
  return (
    <div className="flex items-center m-auto justify-center lg:p-[10rem] pt-[5rem]">
      <img
        src="https://lh6.googleusercontent.com/Bu-pRqU_tWZV7O3rJ5nV1P6NjqFnnAs8kVLC5VGz_Kf7ws0nDUXoGTc7pP87tyUCfu8VyXi0YviIm7CxAISDr2lJSwWwXQxxz98qxVfMcKTJfLPqbcfhn-QEeOowjrlwX1LYDFJN"
        alt="Page not found"
        className="lg:h-[20rem] relative"
      />
      <img
        src={logo}
        alt="logo"
        className="absolute lg:h-[5rem] h-[2rem] lg:ml-[17rem] ml-[8rem] drop-shadow-lg lg:mb-10 mb-3 animate-bounce"
      />
      {/* 404 NOT FOUND */}
    </div>
  );
};

export default ErrorNotFound;
