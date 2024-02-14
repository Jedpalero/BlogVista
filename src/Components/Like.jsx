import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const Like = ({ handleLike, likes, userId }) => {
  const LikeStatus = () => {
    if (likes?.length > 0) {
      return likes.find((id) => id === userId) ? (
        <div className="flex items-center gap-3">
          <AiFillLike />
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <AiOutlineLike />
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </div>
      );
    }
    return (
      <div className="flex items-center gap-3">
        <AiOutlineLike />
        Like
      </div>
    );
  };
  return (
    <>
      <span
        // style={{ float: "right", cursor: "pointer", marginTop: "-7px" }}
        onClick={!userId ? null : handleLike}
      >
        {!userId ? (
          <>
            <button type="button" title="Please Login to like">
              <LikeStatus />
            </button>
          </>
        ) : (
          <button type="button">
            <LikeStatus />
          </button>
        )}
      </span>
    </>
  );
};

export default Like;
