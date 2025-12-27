import React from "react";
import "./OrderSkeleton.css";
import { assets } from "../../assets/assets";

const OrderSkeleton = ({ count = 4 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="order-item skeleton-order">
            <div className="skeleton image-circle"></div>

            <div className="skeleton-content">
              <div className="skeleton line wide"></div>
              <div className="skeleton line medium"></div>
              <div className="skeleton line small"></div>
              <div className="skeleton line small"></div>
            </div>

            <div className="skeleton line tiny"></div>
            <div className="skeleton line tiny"></div>
            <div className="skeleton select"></div>
          </div>
        ))}
    </>
  );
};

export default OrderSkeleton;
