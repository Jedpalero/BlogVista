import React from "react";
import { Link } from "react-router-dom";

const Popular = ({ blogs }) => {
  return (
    <div className="flex flex-col gap-2 overflow-y-scroll lg:h-[31rem]">
      {blogs?.map((blog) => (
        <Link to={`/detail/${blog.id}`} key={blog.id}>
          <div className="lg:flex gap-5 drop-shadow-lg">
            <img
              src={blog.imgUrl}
              alt={blog.id}
              className="h-[10rem] lg:w-[15rem] w-full object-cover"
            />
            <div className="flex flex-col gap-3 p-6">
              <p className="text-[#0facce] text-xs">{blog.category}</p>
              <p className="font-semibold text-lg">{blog.title}</p>
              <p className="uppercase text-xs">by {blog.author}</p>
            </div>
          </div>
          <hr className="mt-3 drop-shadow-lg border" />
        </Link>
      ))}
    </div>
  );
};

export default Popular;
