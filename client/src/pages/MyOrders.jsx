import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, dummyOrders } from "../assets/assets";

const MyOrders = () => {
  const [MyOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();
  const [loading, setLoading] = useState(true);

  const fetchMyOrders = async () => {
    // Check if user is authenticated before making API call
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        console.error("Failed to fetch orders:", data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Don't show toast error for auth failures on page load
      if (error.response?.status !== 401 && error.response?.status !== 403) {
        console.error("Unexpected error fetching orders");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, [user]); // Add user as dependency

  // Show loading state
  if (loading) {
    return (
      <div className="p-4">
        <div className="text-center">Loading your orders...</div>
      </div>
    );
  }

  // Show login message if not authenticated
  if (!user) {
    return (
      <div className="p-4">
        <div className="text-center">
          <p>Please login to view your orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <p>My orders</p>
      </div>
      <div>
        {MyOrders.map((order, index) => (
          <div
            key={order._id}
            className="py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <div>
                OrderId: {order._id}
                <br />
                payment: {order.paymentType}
              </div>
              <div className="w-16 sm:w-20">
                <div>
                  Total Amount: {currency}
                  {order.amount}
                </div>
              </div>
            </div>
            {order.items.map((item, index) => {
              const product = item.product;
              return (
                <div
                  key={index}
                  className="py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex items-start gap-6 text-sm">
                    <div>
                      <div className="w-16 sm:w-20">
                        {product?.image && (
                          <img
                            className="w-16 sm:w-20"
                            src={product.image[0]}
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <div>
                        <p className="sm:text-base font-medium">
                          {product?.name || "Unnamed Product"}
                        </p>
                      </div>
                      <div>Category: {product?.category || "N/A"}</div>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-between">
                    <div className="flex items-center gap-2">
                      <p>Quantity: {item.quantity || "1"}</p>
                      <div>
                        <p>
                          Payment:{" "}
                          {order.bKashInfo?.paymentStatus ||
                            (order.isPaid ? "Paid" : "Pending")}
                        </p>
                      </div>
                      <div>Order Status: {order.status}</div>
                      <div>
                        <p>
                          Date: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p>
                        Amount: {currency}
                        {product?.offerPrice
                          ? product.offerPrice * item.quantity
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        {MyOrders.length === 0 && (
          <div className="text-center p-4">
            <p>No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
