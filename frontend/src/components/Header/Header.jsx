import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const fullText = "Order your favorite food here";

  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [index]);

  return (
    <div className="header">
      <div className="header-contents">
        <h2 className={isTyping ? "typing-cursor" : ""}>
          {fullText.slice(0, index)}
        </h2>

        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>

        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
