import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
  orderBy,
  startAfter,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import BlogSection from "../Components/BlogSection";
import Trending from "../Components/Trending";
import Tags from "../Components/Tags";
import Spinner from "../Components/Spinner";
import { toast } from "react-toastify";
import Popular from "../Components/Popular";
import Footer from "../Components/Footer";
import Category from "../Components/Category";

const Home = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [hide, setHide] = useState(false);

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrendBlogs(trendBlogs);
  };

  useEffect(() => {
    getTrendingBlogs();
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
        // setBlogs(list);
        setTags(uniqueTags);
        setTotalBlogs(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
      getTrendingBlogs();
    };
  }, []);

  const getBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const firstFour = query(blogRef, orderBy("title"), limit(4));
    const docSnapshot = await getDocs(firstFour);
    setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
  };

  useEffect(() => {
    getBlogs();
    setHide(false);
  }, []);

  const updateState = (docSnapshot) => {
    const isCollectionEmpty = docSnapshot.size === 0;
    if (!isCollectionEmpty) {
      const blogsData = docSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs((blogs) => [...blogs, ...blogsData]);
      setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
    } else {
      toast.info("No more blog to display");
      setHide(true);
    }
  };

  const fetchMore = async () => {
    const blogRef = collection(db, "blogs");
    const nextFour = query(
      blogRef,
      orderBy("title"),
      limit(4),
      startAfter(lastVisible)
    );
    const docSnapshot = await getDocs(nextFour);
    updateState(docSnapshot);
  };

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you wanted to delete the blog ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
        // getBlogs();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const counts = totalBlogs.reduce((prevValue, currentValue) => {
    let name = currentValue.category;
    if (!prevValue.hasOwnProperty(name)) {
      prevValue[name] = 0;
    }
    prevValue[name]++;
    delete prevValue["undefined"];
    return prevValue;
  }, {});

  const categoryCount = Object.keys(counts).map((k) => {
    return {
      category: k,
      count: counts[k],
    };
  });

  return (
    <div className=" overflow-y-scroll h-screen pt-10 pb-10">
      <div className="flex flex-col items-center">
        <div className="lg:flex lg:flex-row flex-col gap-[2rem]">
          <div className="relative">
            <div className="lg:text-xl font-bold mb-2 absolute z-10 text-white p-4 drop-shadow-xl text-center">
              <p>“What you do after you create your </p>
              <p>content is what truly counts."</p>
              <p className="lg:text-lg italic">-Gary Vaynerchuk</p>
            </div>
            <Trending blogs={blogs} />
          </div>
          <div className="border p-2 rounded-xl lg:mt-0 mt-5 border-b-4 border-r-4 border-shadow-lg">
            <p className="text-2xl font-bold mb-2">Most Popular</p>
            <Popular blogs={trendBlogs} />
          </div>
        </div>
        <div className="lg:flex gap-12 mt-10 pb-10">
          <div className="space-y-5">
            <p className="text-2xl font-bold mb-2">Latest From Our Blog</p>
            <hr className="border" />
            {blogs?.map((blog) => (
              <BlogSection
                key={blog.id}
                user={user}
                {...blog}
                handleDelete={handleDelete}
              />
            ))}
            {!hide && (
              <button
                onClick={fetchMore}
                className="border p-2 bg-[#0facce] text-white flex m-auto"
              >
                Load More
              </button>
            )}
          </div>
          <div className="lg:w-[20rem] space-y-5 lg:py-0 py-4">
            <p className="text-2xl font-bold mb-2">Tags</p>
            <hr className="border" />
            <Tags tags={tags} />
            <p className="text-2xl font-bold mb-2">Category</p>
            <hr className="border" />
            <Category categoryCount={categoryCount} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
