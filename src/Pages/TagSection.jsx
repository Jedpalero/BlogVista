import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase-config";
import BlogSection from "../Components/BlogSection";
import Spinner from "../Components/Spinner";

const TagSection = () => {
  const [tagBlogs, setTagBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { tag } = useParams();

  const getTagBlogs = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const tagBlogQuery = query(blogRef, where("tags", "array-contains", tag));
    const docSnapshot = await getDocs(tagBlogQuery);
    let tagBlogs = [];
    docSnapshot.forEach((doc) => {
      tagBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTagBlogs(tagBlogs);
    setLoading(false);
  };

  useEffect(() => {
    getTagBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center overflow-y-scroll h-screen">
      <div>
        <div className=" text-center py-8 mb-4">
          Tag: <strong>{tag.toLocaleUpperCase()}</strong>
          <hr className="border mt-3" />
        </div>
        {tagBlogs?.map((item, index) => (
          <div className="pb-[5rem]" key={index}>
            <BlogSection key={item.id} {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSection;
