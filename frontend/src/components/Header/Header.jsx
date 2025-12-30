// import React from "react";
// import "./Header.css";

// const Header = () => {
//   return (
//     <div className="header">
//       <div className="header-contents">
//         <h2>Order your favorite food here</h2>
//         <p>
//           Choose from a diverse menu featuring a delectable array of dishes
//           crafted with the finest ingredients and culinary expertise. Our
//           mission is to satisfy your cravings and elevate your dining
//           experience, one delicious meal at a time.
//         </p>
//         <button>View Menu</button>
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const fullText = "Order your favorite food here";

  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false); //typing completed
    }
  }, [index, fullText]);

  return (
    <div className="header">
      <div className="header-contents">
        {/* cursor only while typing */}
        <h2 className={isTyping ? "typing-cursor" : ""}>{displayText}</h2>

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
