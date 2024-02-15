import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Trending = ({ blogs }) => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div className="flex justify-center">
      <Slider
        {...settings}
        className="lg:w-[50rem] md:w-[40rem] sm:w-[30rem] w-[23rem] drop-shadow-lg border rounded-xl overflow-hidden"
      >
        {blogs?.slice(2, 4).map((item) => (
          <img
            key={item.id}
            src={item.imgUrl}
            alt={item.title}
            className="lg:h-[36rem] h-[20rem]  object-cover overflow-hidden rounded-xl"
          />
        ))}
      </Slider>
      <div className="absolute top-0 bottom-0 left-0 right-0 z-1 overlay1 rounded-xl"></div>
    </div>
  );
};

export default Trending;
