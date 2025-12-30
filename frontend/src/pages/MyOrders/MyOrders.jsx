import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import MyOrdersSkeleton from "../../components/MyOrdersSkeleton/MyOrdersSkeleton";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setTrackOrder] = useState("");
  const getOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const trackOrder = async (orderId) => {
    try {
      const response = await axios.post(
        url + "/api/order/track",
        { orderId },
        { headers: { token } }
      );
      console.log(response.data);

      setTrackOrder(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      setData([]);
      return;
    }
    setIsLoading(true);
    getOrders();
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {!token ? (
        <div className="empty-state">
          <h3>Login to place your order 🍔</h3>
          <p>
            Sign in to see your orders, track delivery status, and reorder your
            favorite food.
          </p>
        </div>
      ) : (
        <div className="container">
          {isLoading ? (
            <MyOrdersSkeleton count={4} />
          ) : data.length === 0 ? (
            <div className="empty-state">
              <h3>No orders yet 🛒</h3>
              <p>
                You haven’t placed any orders yet. Add items to cart and place
                your first order!
              </p>
            </div>
          ) : (
            data.map((order) => {
              return (
                <div key={order._id} className="my-orders-order">
                  <img src={assets.parcel_icon} alt="" />
                  <p>
                    {order.items.map((item, idx) => {
                      if (idx === order.items.length - 1) {
                        return item.name + " X" + item.quantity;
                      } else {
                        return item.name + " X" + item.quantity + ", ";
                      }
                    })}
                  </p>
                  <p>${order.amount}.00</p>
                  <p>Items: {order.items.length}</p>
                  <p>
                    <span> &#x25cf;</span>
                    <b> {order.status}</b>
                  </p>
                  <button onClick={() => trackOrder(order._id)}>
                    Track Order
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
