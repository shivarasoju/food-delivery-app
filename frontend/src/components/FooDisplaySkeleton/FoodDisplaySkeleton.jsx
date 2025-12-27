import React from "react";
import "./FoodDisplaySkeleton.css";

const FoodDisplaySkeleton = ({ count = 8 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="food-item skeleton-card">
            <div className="food-item-img-container">
              <div className="skeleton skeleton-image"></div>
            </div>

            <div className="food-item-info">
              <div className="food-item-name-rating">
                <div className="skeleton skeleton-text name"></div>
                <div className="skeleton skeleton-rating"></div>
              </div>

              <div className="skeleton skeleton-text desc"></div>
              <div className="skeleton skeleton-text desc small"></div>
              <div className="skeleton skeleton-text price"></div>
            </div>
          </div>
        ))}
    </>
  );
};

export default FoodDisplaySkeleton;
