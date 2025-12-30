// import React, { useContext, useState } from "react";
// import "./LoginPopup.css";
// import { assets } from "../../assets/assets";
// import { StoreContext } from "../../context/storeContext";
// import axios from "axios";

// const LoginPopup = ({ setShowLogin }) => {
//   const [currState, setCurrState] = useState("Sign Up");
//   const { url, setToken, fetchFoodList, loadCartData } =
//     useContext(StoreContext);

//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const onChangeHandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const onLogin = async (e) => {
//     e.preventDefault();
//     let newUrl = url;
//     if (currState === "Login") {
//       newUrl += "/api/user/login";
//     } else {
//       newUrl += "/api/user/register";
//     }

//     const response = await axios.post(newUrl, data);
//     if (response.data.success) {
//       setToken(response.data.token);
//       localStorage.setItem("token", response.data.token);
//       fetchFoodList();
//       loadCartData(response.data.token);
//       setShowLogin(false);
//     } else {
//       alert(response.data.message);
//     }
//   };

//   return (
//     <div className="login-popup">
//       <form onSubmit={onLogin} className="login-popup-container">
//         <div className="login-popup-title">
//           <h2>{currState}</h2>
//           <img
//             onClick={() => setShowLogin(false)}
//             src={assets.cross_icon}
//             alt=""
//           />
//         </div>
//         <div className="login-popup-input">
//           {currState === "Login" ? (
//             <></>
//           ) : (
//             <input
//               type="text"
//               placeholder="Your name "
//               required
//               name="name"
//               onChange={onChangeHandler}
//               value={data.name}
//               id=""
//             />
//           )}

//           <input
//             type="email"
//             name="email"
//             onChange={onChangeHandler}
//             value={data.email}
//             placeholder="Your email"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             onChange={onChangeHandler}
//             value={data.password}
//             placeholder="Password"
//             required
//           />
//         </div>
//         <button type="submit">
//           {currState === "Sign Up" ? "Create account" : "Login"}
//         </button>
//         <div className="login-popup-condition">
//           <input type="checkbox" required />
//           <p>By continuing, I agree to the terms of use & privacy policy.</p>
//         </div>
//         {currState === "Sign Up" ? (
//           <p>
//             Already have an account?{" "}
//             <span onClick={() => setCurrState("Login")}>Login here</span>
//           </p>
//         ) : (
//           <p>
//             Create a new account?{" "}
//             <span onClick={() => setCurrState("Sign Up")}>Click here</span>
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default LoginPopup;
import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [loading, setLoading] = useState(false);

  const { url, setToken, fetchFoodList, loadCartData } =
    useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint =
      currState === "Login" ? "/api/user/login" : "/api/user/register";

    const payload =
      currState === "Login"
        ? { email: data.email, password: data.password }
        : data;

    try {
      const response = await axios.post(url + endpoint, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        fetchFoodList();
        loadCartData(response.data.token);

        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt="Close"
            onClick={() => setShowLogin(false)}
          />
        </div>

        <div className="login-popup-input">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              value={data.name}
              onChange={onChangeHandler}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            value={data.email}
            onChange={onChangeHandler}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={data.password}
            onChange={onChangeHandler}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading
            ? "Signing In..."
            : currState === "Sign Up"
            ? "Create account"
            : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
