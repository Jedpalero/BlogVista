import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase-config";
import BlogSection from "../Components/BlogSection";
import Spinner from "../Components/Spinner";

const CategorySection = () => {
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();

  const getCategoryBlogs = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const categoryBlogQuery = query(blogRef, where("category", "==", category));
    const docSnapshot = await getDocs(categoryBlogQuery);
    let categoryBlogs = [];
    docSnapshot.forEach((doc) => {
      categoryBlogs.push({ id: doc.id, ...doc.data() });
    });
    setCategoryBlogs(categoryBlogs);
    setLoading(false);
  };

  useEffect(() => {
    getCategoryBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center overflow-y-scroll h-screen">
      <div>
        <div className=" text-center py-8 mb-4">
          Category: <strong>{category.toLocaleUpperCase()}</strong>
          <hr className="border mt-3" />
        </div>
        {categoryBlogs?.map((item, index) => (
          <div className="pb-[5rem]" key={index}>
            <BlogSection key={item.id} {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
