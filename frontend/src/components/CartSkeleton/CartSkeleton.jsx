import React from "react";
import "./CartSkeleton.css";

const CartItemsSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          <div className="cart-items-title cart-items-item">
            <div className="skeleton skeleton-img"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-small"></div>
            <div className="skeleton skeleton-small"></div>
            <div className="skeleton skeleton-small"></div>
            <div className="skeleton skeleton-cross"></div>
          </div>
          <hr />
        </div>
      ))}
    </>
  );
};

export default CartItemsSkeleton;
