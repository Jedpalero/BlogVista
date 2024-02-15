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
  // const userId = user?.uid
  return (
    <div className="flex flex-col mb-3">
      <div className="border lg:flex gap-5">
        <img
          src={imgUrl}
          alt={title}
          className="object-cover lg:w-[30rem] w-full h-[20rem] overflow-hidden"
        />
        <div className="flex flex-col gap-2 justify-center p-2 lg:w-[40rem]">
          <h1 className="bg-[#0facce] p-1 w-[100px] text-center rounded-sm font-bold text-white text-sm">
            {category}
          </h1>
          <h1 className="font-semibold">{title}</h1>
          <span>
            <b>{author}</b> - {timestamp.toDate().toDateString()}
          </span>
          <p>{excerpt(description, 120)}</p>
          <div className="flex justify-between items-center">
            <Link
              to={`/detail/${id}`}
              className="bg-[#17445b] p-1 text-white transition duration-500 ease-in-out hover:scale-125"
            >
              Read More
            </Link>
            {user?.uid && userId === user.uid && (
              <div className="flex gap-4 mr-3">
                <RiDeleteBin7Fill
                  onClick={() => handleDelete(id)}
                  className="cursor-pointer hover:text-red-600"
                />
                <Link to={`/update/${id}`}>
                  <FaEdit className="cursor-pointer hover:text-[#0facce]" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
