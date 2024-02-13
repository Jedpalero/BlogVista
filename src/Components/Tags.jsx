import { Link } from "react-router-dom";

const Tags = ({ tags }) => {
  return (
    <div>
      <div className=" flex gap-3 flex-wrap justify-center">
        {tags?.map((tag, index) => (
          <p
            className="bordr p-2 w-auto bg-[#ece8e8] hover:scale-125 ease-in-out duration-300  text-center drop-shadow-md"
            key={index}
          >
            <Link
              to={`/tag/${tag}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {tag}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Tags;
