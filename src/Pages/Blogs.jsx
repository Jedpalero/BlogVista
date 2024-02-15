import {
  collection,
  endAt,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import Spinner from "../Components/Spinner";
import BlogSection from "../Components/BlogSection";
import Pagination from "../Components/Pagination";

const Blogs = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const [noOfPages, setNoOfPages] = useState(null);
  const [count, setCount] = useState(null);

  useEffect(() => {
    getBlogsData();
    getTotalBlogs();
  }, []);

  const getBlogsData = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const first = query(blogRef, orderBy("title"), limit(2));
    const docSnapshot = await getDocs(first);
    setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setCount(docSnapshot.size);
    setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
    setLoading(false);
  };

  const getTotalBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const docSnapshot = await getDocs(blogRef);
    const totalBlogs = docSnapshot.size;
    const totalPage = Math.ceil(totalBlogs / 2);
    setNoOfPages(totalPage);
  };

  if (loading) {
    return <Spinner />;
  }

  const fetchMore = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const nextBlogQuery = query(
      blogRef,
      orderBy("title"),
      startAfter(lastVisible),
      limit(2)
    );
    const nextBlogsSnapshot = await getDocs(nextBlogQuery);
    setBlogs(
      nextBlogsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setCount(nextBlogsSnapshot.size);
    setLastVisible(nextBlogsSnapshot.docs[nextBlogsSnapshot.docs.length - 1]);
    setLoading(false);
  };

  const fetchPrev = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const end =
      noOfPages !== currentPage ? endAt(lastVisible) : endBefore(lastVisible);
    const limitData =
      noOfPages !== currentPage
        ? limit(2)
        : count <= 2 && noOfPages % 2 === 0
        ? limit(2)
        : limitToLast(2);
    const prevBlogsQuery = query(blogRef, orderBy("title"), end, limitData);
    const prevBlogsSnapshot = await getDocs(prevBlogsQuery);
    setBlogs(
      prevBlogsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setCount(prevBlogsSnapshot.size);
    setLastVisible(prevBlogsSnapshot.docs[prevBlogsSnapshot.docs.length - 1]);
    setLoading(false);
  };

  const handlePageChange = (value) => {
    if (value === "Next") {
      setCurrentPage((page) => page + 1);
      fetchMore();
    } else if (value === "Prev") {
      setCurrentPage((page) => page - 1);
      fetchPrev();
    }
  };

  return (
    <div className="overflow-y-scroll h-screen pb-12">
      <h1 className="text-center py-5 lg:text-3xl text-xl font-bold">
        Daily Blogs
      </h1>
      <hr className="border flex justify-center m-auto lg:w-[70rem]" />
      <div className="flex flex-wrap justify-center pt-5 gap-3">
        {blogs?.map((blog) => (
          <div key={blog.id} className="">
            <BlogSection {...blog} />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        noOfPages={noOfPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Blogs;
