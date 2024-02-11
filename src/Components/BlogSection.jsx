import React from "react";
import { excerpt } from "../utility";
import { Link } from "react-router-dom";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

const BlogSection = ({
  id,
  title,
  description,
  category,
  imgUrl,
  userId,
  author,
  user,
  timestamp,
  handleDelete,
}) => {
  return (
    <div className="flex flex-col mb-3">
      <div key={id} className="w-[47rem] border flex gap-5">
        <img src={imgUrl} alt={title} className=" object-fill w-[15rem]" />
        <div className="flex flex-col gap-2 m-auto p-2">
          <h1 className="bg-[#0facce] p-1 w-[100px] text-center rounded-sm font-bold text-white text-sm">
            {category}
          </h1>
          <h1 className="font-semibold">{title}</h1>
          <span>
            <b>{title}</b> - {timestamp.toDate().toDateString()}
          </span>
          <p>{excerpt(description, 120)}</p>
          <div className="flex justify-between items-center">
            <Link to={`/detail/${id}`} className="bg-[#17445b] p-1 text-white">
              Read More
            </Link>
            <div className="flex gap-4 mr-3">
              <RiDeleteBin7Fill />
              <FaEdit />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
