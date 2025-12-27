import React from "react";
import "./MyOrdersSkeleton.css";

const MyOrdersSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="my-orders-order skeleton-order">
            <div className="skeleton skeleton-icon"></div>

            <div className="skeleton skeleton-text wide"></div>
            <div className="skeleton skeleton-text price"></div>
            <div className="skeleton skeleton-text small"></div>
            <div className="skeleton skeleton-text status"></div>

            <div className="skeleton skeleton-button"></div>
          </div>
        ))}
    </>
  );
};

export default MyOrdersSkeleton;
