import { useNavigate } from "react-router";

const CommentBox = ({ userId, userComment, setUserComment, handleComment }) => {
  const navigate = useNavigate();
  return (
    <>
      <form className="form" name="form">
        <div className="border">
          <textarea
            className="w-full p-4"
            name="comment"
            rows="4"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
          />
        </div>
      </form>
      {!userId ? (
        <div className="justify-center flex flex-col items-center">
          <h5>Please Login to post a comment</h5>
          <button
            onClick={() => navigate("/auth")}
            className="border p-2 rounded-lg bg-[#0facce] text-white hover:-translate-y-2 ease-in duration-150"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleComment}
            className="border p-2 rounded-lg bg-[#0facce] text-white hover:-translate-y-2 ease-in duration-150"
          >
            Comment
          </button>
        </div>
      )}
    </>
  );
};

export default CommentBox;
