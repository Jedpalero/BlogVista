import React from "react";

const UserComments = ({ name, body, createdAt, msg }) => {
  return (
    <div>
      <div>
        {msg ? (
          <h1 className="flex justify-center">{msg}</h1>
        ) : (
          <>
            <div className="flex gap-5 flex-start py-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="user"
                className="lg:h-[4rem] h-[3rem]"
              />
              <div className="lg:text-lg text-sm">
                <h1 className="font-semibold">
                  {name}{" "}
                  <small className="text-gray-500">
                    {createdAt.toDate().toDateString()}
                  </small>
                </h1>
                <p>{body}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserComments;
