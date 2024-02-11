import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase-config";
import Tags from "../Components/Tags";

const Details = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    setBlog(blogDetail.data());
  };

  return (
    <div className="overflow-y-scroll w-full h-screen pb-12">
      <div
        className="bg-cover bg-no-repeat bg-center h-[700px] relative flex justify-center text-center"
        style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
      >
        {/* <div className="absolute top-0 bottom-0 left-0 right-0 z-10"></div> */}
        <div className="bottom-0 absolute text-white p-5">
          <span className="text-gray-400 text-2xl">
            {blog?.timestamp.toDate().toDateString()}
          </span>
          <h2 className="text-[4rem] font-bold mt-3">{blog?.title}</h2>
        </div>
      </div>
      <div className="text-lg w-[100rem] m-auto">
        <div className="p-10 space-y-3">
          <span className="flex items-center">
            By &nbsp; <h1 className="font-semibold">{blog?.author}</h1> &nbsp;
            -&nbsp;
            {blog?.timestamp.toDate().toDateString()}
          </span>
          <hr />
          <p>{blog?.description}</p>
          <div className="">
            <Tags tags={blog?.tags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
