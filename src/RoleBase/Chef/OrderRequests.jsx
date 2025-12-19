import useAxiosSecure from "../../hooks/useAxiosSecure";

import Loader from "../../Components/Common/Loader";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useChefid from "../../hooks/useChefid";

const OrderRequests = () => {
  const [chefId, isChefLoading] = useChefid();

  const axiosSecure = useAxiosSecure();

  const { data: OrderRequests = [] } = useQuery({
    queryKey: ["my-meal-order", chefId],
    queryFn: async () => {
      const res = await axiosSecure(`/my-meal-order/${chefId}`);
      return res.data;
    },
  });

  const handleAccept = async (id) => {
    try {
      const res = await axiosSecure.patch(`/update-order-status/${id}`, {
        status: "accepted",
      });
      toast.success("order accepted successfully", res.data);
      window.location.reload();
    } catch (error) {
      toast.error("Error accepting order:", error);
    }
  };

  const handleCanceled = async (id) => {
    try {
      const res = await axiosSecure.patch(`/update-order-status/${id}`, {
        status: "cancelled",
      });
      toast.success("order cancelled", res.data);
      window.location.reload();
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };
  const handleDeliver = async (id) => {
    try {
      const res = await axiosSecure.patch(`/update-order-status/${id}`, {
        status: "delivered",
      });
      toast.success("Order Delivered", res.data);
      window.location.reload();
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  if (isChefLoading) return <Loader />;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Food Name</th>
            <th>Price </th>
            <th>Quantity</th>
            <th>Order Status</th>
            <th>User Email</th>
            <th>Order Time</th>
            <th> User Adress</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {OrderRequests.map((order, index) => {
            return (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <th>{order.mealName}</th>
                <th>{order.price}</th>
                <th>{order.quantity}</th>
                <th>{order.orderStatus}</th>
                <th>{order.userEmail}</th>
                <th>{order.orderTime}</th>
                <th>
                  {order.UserAddress.district},{order.UserAddress.region}
                </th>
                <th>{order.paymentStatus}</th>

                {order.orderStatus === "Pending" && (
                  <th>
                    <button
                      onClick={() => handleAccept(order._id)}
                      className="btn btn-xs border border-primary"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleCanceled(order._id)}
                      className="btn btn-xs border border-primary"
                    >
                      Cencel
                    </button>
                    <button
                      onClick={() => handleDeliver(order._id)}
                      className="btn btn-xs border border-primary"
                    >
                      Deliver
                    </button>
                  </th>
                )}

                {order.orderStatus === "accepted" && (
                  <th>
                    <button
                      disabled="true"
                      onClick={() => handleAccept(order._id)}
                      className="btn btn-xs border border-primary"
                    >
                      Accept
                    </button>
                    <button
                      disabled="true"
                      onClick={() => handleCanceled(order._id)}
                      className="btn btn-xs border border-primary"
                    >
                      Cencel
                    </button>
                    <button
                      onClick={() => handleDeliver(order._id)}
                      className="btn btn-xs border border-primary"
                    >
                      Deliver
                    </button>
                  </th>
                )}
                {order.orderStatus === "cancelled" && (
                  <th>
                    <button
                      disabled="true"
                      onClick={() => handleAccept(order._id)}
                      className="btn btn-xs border border-primary"
                    >
                      Accept
                    </button>
                    <button
                      disabled="true"
                      onClick={() => handleCanceled(order._id)}
                      className="btn btn-xs border border-primary"
                    >
                      Cencel
                    </button>
                    <button
                      disabled="true"
                      onClick={() => handleDeliver(order._id)}
                      className="btn btn-xs border border-primary"
                    >
                      Deliver
                    </button>
                  </th>
                )}

                {order.orderStatus === "delivered" && (
                  <th>
                    <button
                      disabled="true"
                      onClick={() => handleAccept(order._id)}
                      className="btn btn-xs border border-primary"
                    >
                      Accept
                    </button>
                    <button
                      disabled="true"
                      onClick={() => handleCanceled(order._id)}
                      className="btn btn-xs border border-primary"
                    >
                      Cencel
                    </button>
                    <button
                      disabled="true"
                      onClick={() => handleDeliver(order._id)}
                      className="btn btn-xs border border-primary"
                    >
                      Deliver
                    </button>
                  </th>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default OrderRequests;
