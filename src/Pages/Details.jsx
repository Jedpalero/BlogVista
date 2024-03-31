import {
  Timestamp,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase-config";
import Tags from "../Components/Tags";
import Spinner from "../Components/Spinner";
import { isEmpty } from "lodash";
import UserComments from "../Components/UserComments";
import CommentBox from "../Components/CommentBox";
import { toast } from "react-toastify";
import Like from "../Components/Like";

const Details = ({ user }) => {
  const userId = user?.uid;
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  let [likes, setLikes] = useState([]);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    setLoading(true);
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    setComments(blogDetail.data().comments ? blogDetail.data().comments : []);
    setLikes(blogDetail.data().likes ? blogDetail.data().likes : []);
    setBlog(blogDetail.data());
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  const handleComment = async (e) => {
    e.preventDefault();
    comments.push({
      createdAt: Timestamp.fromDate(new Date()),
      userId,
      name: user?.displayName,
      body: userComment,
    });
    toast.success("Comment posted successfully");
    await updateDoc(doc(db, "blogs", id), {
      ...blog,
      comments,
      timestamp: serverTimestamp(),
    });
    setComments(comments);
    setUserComment("");
  };

  const handleLike = async () => {
    if (userId) {
      if (blog?.likes) {
        const index = likes.findIndex((id) => id === userId);
        if (index === -1) {
          likes.push(userId);
          setLikes([...new Set(likes)]);
        } else {
          likes = likes.filter((id) => id !== userId);
          setLikes(likes);
        }
      }
      await updateDoc(doc(db, "blogs", id), {
        ...blog,
        likes,
        timestamp: serverTimestamp(),
      });
    }
  };

  return (
    <div className="overflow-y-scroll w-full h-screen pb-12">
      <div
        className="bg-cover bg-no-repeat bg-center lg:h-[700px] h-[400px] relative flex justify-center text-center"
        style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
      >
        <div className="absolute top-0 bottom-0 left-0 right-0 z-1 overlay"></div>
        <div className="bottom-0 absolute text-white p-5 z-10">
          <span className="text-gray-400 lg:text-2xl ">
            {blog?.timestamp.toDate().toDateString()}
          </span>
          <h2 className="lg:text-[4rem] text-2xl font-bold lg:mt-3 lg:p-3">
            {blog?.title}
          </h2>
        </div>
      </div>
      <div className="text-lg lg:w-[90rem] m-auto">
        <div className="p-10 space-y-1">
          <span className="flex items-center">
            By &nbsp; <h1 className="font-semibold">{blog?.author}</h1> &nbsp;
            -&nbsp;
            {blog?.timestamp.toDate().toDateString()}
          </span>
          <div className="flex justify-end">
            <Like handleLike={handleLike} likes={likes} userId={userId} />
          </div>
          <hr />
          <p>{blog?.description}</p>
          <div className="py-5">
            <Tags tags={blog?.tags} />
          </div>
          <h3 className="border w-[10rem] text-center bg-[#17445b] text-white lg:text-lg text-sm">
            {comments?.length} {comments?.length > 1 ? "Comments" : "Comment"}
          </h3>
          <div className="border-4 border-double h-[15rem]  p-5 pl-10 overflow-y-scroll">
            {isEmpty(comments) ? (
              <UserComments msg={"No comment yet, be the first to comment"} />
            ) : (
              <>
                {comments?.map((comment, index) => (
                  <UserComments {...comment} key={index} />
                ))}
              </>
            )}
          </div>
          <CommentBox
            userId={userId}
            userComment={userComment}
            setUserComment={setUserComment}
            handleComment={handleComment}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
