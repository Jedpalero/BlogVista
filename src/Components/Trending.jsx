import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Trending = ({ blogs }) => {
  const options = {
    loop: true,
    slideBy: 1,
    dots: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 1,
      },
    },
  };

  return (
    <div>
      <OwlCarousel {...options}>
        {blogs?.map((item) => (
          <div key={item.id}>
            <img
              src={item.imgUrl}
              alt={item.title}
              className="h-[326px] min-w-full"
            />
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
};

export default Trending;
