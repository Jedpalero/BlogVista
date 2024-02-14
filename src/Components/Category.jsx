import React from "react";
import { Link } from "react-router-dom";

const Category = ({ categoryCount }) => {
  return (
    <div>
      <div className=" flex flex-col gap-3 justify-center p-3">
        {categoryCount?.map((item, index) => (
          <div className="py-2" key={index}>
            <Link
              to={`/category/${item.category}`}
              className="flex justify-between"
              style={{ textDecoration: "none", color: "black" }}
            >
              {item.category}
              <span>({item.count})</span>
            </Link>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
