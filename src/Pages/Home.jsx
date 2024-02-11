import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import BlogSection from "../Components/BlogSection";
// import Trending from "../Components/Trending";
import Tags from "../Components/Tags";

const Home = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);

  // const getTrendingBlogs = async () => {
  //   const blogRef = collection(db, "blogs");
  //   const trendQuery = query(blogRef, where("trending", "==", "yes"));
  //   const querySnapshot = await getDocs(trendQuery);
  //   let trendBlogs = [];
  //   querySnapshot.forEach((doc) => {
  //     trendBlogs.push({ id: doc.id, ...doc.data() });
  //   });
  //   setTrendBlogs(trendBlogs);
  // };

  useEffect(() => {
    // getTrendingBlogs();
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setBlogs(list);
        setTags(uniqueTags);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
      // getTrendingBlogs();
    };
  }, []);

  // console.log("blogs", blogs);

  return (
    <div className="flex flex-col  items-center m-auto justify-center overflow-y-scroll h-screen pb-12">
      <div>
        <p>Trending</p>
        {/* <Trending blogs={trendBlogs} /> */}
      </div>
      <div>
        <p>Daily Blogs</p>
        {blogs?.map((blog) => (
          <BlogSection key={blog.id} user={user} {...blog} />
        ))}
      </div>
      <div>
        <p>Tags</p>
        <Tags tags={tags} />
      </div>
      <div>Most Popular</div>
    </div>
  );
};

export default Home;
