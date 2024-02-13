// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Trending = ({ blogs }) => {
  const settings = {
    // dots: false,
    // infinite: false,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 0,
    // arrows: true,
    // lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 3000,
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // initialSlide: 2,
    adaptiveHeight: true,
  };

  // const options = {
  //   loop: true,
  //   slideBy: 1,
  //   dots: true,
  //   margin: 10,
  //   new: true,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     400: {
  //       items: 1,
  //     },
  //     600: {
  //       items: 1,
  //     },
  //     1000: {
  //       items: 1,
  //     },
  //   },
  // };

  return (
    <div className="flex justify-center">
      <Slider
        {...settings}
        className="lg:w-[50rem] md:w-[40rem] sm:w-[30rem] w-[23rem] drop-shadow-lg border rounded-xl overflow-hidden"
      >
        {blogs?.slice(0, 2).map((item) => (
          <img
            key={item.id}
            src={item.imgUrl}
            alt={item.title}
            className="lg:h-[36rem] h-[20rem]  object-cover overflow-hidden rounded-xl"
          />
        ))}
      </Slider>
      <div className="lg:absolute top-0 bottom-0 left-0 right-0 z-1 overlay1 rounded-xl"></div>
    </div>
  );
};

export default Trending;
