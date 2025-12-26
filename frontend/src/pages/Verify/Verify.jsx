import React from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { useEffect } from "react";

const Verify = () => {
  const [serachParams, setSearchParams] = useSearchParams();
  const success = serachParams.get("success");
  const orderId = serachParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  //   console.log(success.orderId);

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/my-orders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
