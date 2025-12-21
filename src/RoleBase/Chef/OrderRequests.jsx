import useAxiosSecure from "../../hooks/useAxiosSecure";

import Loader from "../../Components/Common/Loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useChefid from "../../hooks/useChefid";

const OrderRequests = () => {
  const [chefId, isChefLoading] = useChefid();
  console.log(typeof chefId);

  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/update-order-status/${id}`, {
        status,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });

  const { data: OrderRequests = [], refetch } = useQuery({
    queryKey: ["my-meal-order", chefId],
    queryFn: async () => {
      const res = await axiosSecure(`/my-meal-order/${chefId}`);
      return res.data;
    },
  });

  const handleAccept = async (id) => {
    try {
      const res = await mutateAsync({ id, status: "accepted" });
      toast.success("Accepted order successfully", res.message);
      refetch();
    } catch (error) {
      toast.error("Error accepting order:", error);
    }
  };

  const handleCanceled = async (id) => {
    try {
      const res = await mutateAsync({ id, status: "cancelled" });
      toast.success("Accepted order successfully", res.message);
      refetch();
    } catch (error) {
      toast.error("Error cencelled order:", error);
    }
  };
  const handleDeliver = async (id) => {
    try {
      const res = await mutateAsync({ id, status: "delivered" });
      toast.success("order delivered successfully", res.message);
      refetch();
    } catch (error) {
      toast.error("Error delivered order:", error);
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
                <th className="text-md font-bold text-primary">
                  {order.mealName}
                </th>
                <th>{order.price}</th>
                <th>{order.quantity}</th>
                <th>
                  {" "}
                  {order.orderStatus === "Pending" ? (
                    <p className="text-red-500 border-red-500 border-2 rounded-lg p-2 text-center">
                      Pending
                    </p>
                  ) : order.orderStatus === "accepted" ? (
                    <p className="text-green-500 border-green-500 border-2 rounded-lg p-2 text-center">
                      Accepted
                    </p>
                  ) : order.orderStatus === "delivered" ? (
                    <p className="text-blue-500 border-blue-500 border-2 rounded-lg p-2 text-center">
                      Delivered
                    </p>
                  ) : (
                    <p className="text-red-500 border-red-500 border-2 rounded-lg p-2 text-center">
                      Cancelled
                    </p>
                  )}
                </th>
                <th>{order.userEmail}</th>
                <th>{order.orderTime}</th>
                <th>
                  {order.UserAddress.district || "N/A"},
                  {order.UserAddress.region || "N/A"}
                </th>
                <th>
                  {order.paymentStatus === "paid" ? (
                    <p className="text-green-500 border-green-500 border rounded-lg p-1 text-center">
                      Paid
                    </p>
                  ) : (
                    <p className="text-blue-500 border-blue-500 border rounded-lg p-1 text-center">
                      Unpaid
                    </p>
                  )}
                </th>

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
